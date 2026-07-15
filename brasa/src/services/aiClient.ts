import { buildSystemPrompt } from '../lib/systemPrompt';
import type { BrainNote, ChatMessage } from '../types/brain';

export interface AssistantReplyInput {
  notes: BrainNote[];
  messages: ChatMessage[];
  userText: string;
}

export async function requestAssistantReply(input: AssistantReplyInput): Promise<string> {
  const systemPrompt = buildSystemPrompt({
    assistantName: 'Brasa',
    userTitle: 'Senhor',
    personality: 'formal, estratégico e direto ao ponto',
    notes: input.notes
  });

  try {
    const response = await fetch('/api/anthropic/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemPrompt,
        messages: input.messages,
        userText: input.userText
      })
    });

    if (!response.ok) {
      throw new Error(`Claude proxy respondeu ${response.status}`);
    }

    const data = (await response.json()) as { text?: string };
    return data.text?.trim() || localAssistantFallback(input.userText);
  } catch {
    return localAssistantFallback(input.userText);
  }
}

function localAssistantFallback(userText: string): string {
  if (userText.toLowerCase().includes('meta')) {
    return 'Senhor, vou tratar isso como prioridade estratégica e conectar a ação à meta de faturamento mensal.';
  }

  return 'Senhor, recebi o comando. Sem o proxy de IA ativo, mantenho o registro local e preparo a próxima ação operacional.';
}
