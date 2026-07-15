import { create } from 'zustand';
import { getAllNotes, saveMemoryFromTag, seedInitialNotes, upsertNote } from '../db/brainDb';
import { parseSaveTags } from '../lib/memoryTag';
import { requestAssistantReply } from '../services/aiClient';
import { triggerAutomation } from '../services/automationClient';
import { speakWithElevenLabs } from '../services/voiceClient';
import type { AssistantStatus, BrainNote, ChatMessage } from '../types/brain';

interface AssistantState {
  status: AssistantStatus;
  notes: BrainNote[];
  messages: ChatMessage[];
  selectedNote?: BrainNote;
  input: string;
  isBooted: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  memoryPulse: number;
  hydrate: () => Promise<void>;
  activate: () => Promise<void>;
  setStatus: (status: AssistantStatus) => void;
  setInput: (input: string) => void;
  setSelectedNote: (note?: BrainNote) => void;
  setListening: (isListening: boolean) => void;
  submitCommand: (text: string) => Promise<void>;
  updateNote: (note: BrainNote) => Promise<void>;
  cancelAudio: () => void;
}

let audioAbortController: AbortController | undefined;

function createMessage(role: ChatMessage['role'], content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    createdAt: new Date().toISOString()
  };
}

export const useAssistantStore = create<AssistantState>((set, get) => ({
  status: 'boot',
  notes: [],
  messages: [],
  input: '',
  isBooted: false,
  isSpeaking: false,
  isListening: false,
  memoryPulse: 0,

  hydrate: async () => {
    const notes = await seedInitialNotes();
    set({ notes });
  },

  activate: async () => {
    set({ isBooted: true, status: 'thinking' });
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
    } catch {
      console.info('[Brasa] Permissão de microfone ainda não concedida.');
    }

    audioAbortController = new AbortController();
    set({ isSpeaking: true, isListening: false, status: 'speaking' });
    await speakWithElevenLabs('Sistemas do Brasa ativos. Pronto para operar, Senhor.', audioAbortController.signal);
    set({ isSpeaking: false, status: 'idle' });
  },

  setStatus: (status) => set({ status }),
  setInput: (input) => set({ input }),
  setSelectedNote: (selectedNote) => set({ selectedNote }),
  setListening: (isListening) => set({ isListening, status: isListening ? 'listening' : 'idle' }),

  submitCommand: async (text) => {
    const command = text.trim();
    if (!command || get().isSpeaking) {
      return;
    }

    const userMessage = createMessage('user', command);
    set((state) => ({
      input: '',
      messages: [...state.messages, userMessage],
      status: 'thinking',
      isListening: false
    }));

    await triggerAutomation('assistant.command', { text: command });

    const rawReply = await requestAssistantReply({
      notes: get().notes,
      messages: get().messages,
      userText: command
    });
    const parsed = parseSaveTags(rawReply);

    for (const save of parsed.saves) {
      const note = await saveMemoryFromTag(save);
      await triggerAutomation('memory.saved', note);
    }

    const notes = await getAllNotes();
    const assistantMessage = createMessage('assistant', parsed.cleanText);
    set((state) => ({
      notes,
      memoryPulse: parsed.saves.length > 0 ? state.memoryPulse + 1 : state.memoryPulse,
      messages: [...state.messages, assistantMessage],
      status: 'speaking',
      isSpeaking: true
    }));

    audioAbortController = new AbortController();
    await speakWithElevenLabs(parsed.cleanText, audioAbortController.signal);
    set({ isSpeaking: false, status: 'idle' });
  },

  updateNote: async (note) => {
    const updated = await upsertNote(note);
    await triggerAutomation('note.updated', updated);
    const notes = await getAllNotes();
    set((state) => ({
      notes,
      selectedNote: updated,
      memoryPulse: state.memoryPulse + 1
    }));
  },

  cancelAudio: () => {
    audioAbortController?.abort();
    set({ isSpeaking: false, status: 'idle' });
  }
}));
