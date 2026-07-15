import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { areaColors } from '../lib/graph';
import { useAssistantStore } from '../store/assistantStore';
import type { BrainArea } from '../types/brain';

const areas = Object.keys(areaColors) as BrainArea[];

export function NoteModal() {
  const selectedNote = useAssistantStore((state) => state.selectedNote);
  const setSelectedNote = useAssistantStore((state) => state.setSelectedNote);
  const updateNote = useAssistantStore((state) => state.updateNote);
  const [title, setTitle] = useState('');
  const [area, setArea] = useState<BrainArea>('PROJETOS');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!selectedNote) {
      return;
    }

    setTitle(selectedNote.title);
    setArea(selectedNote.area);
    setContent(selectedNote.content);
  }, [selectedNote]);

  if (!selectedNote) {
    return null;
  }

  return (
    <motion.div
      className="absolute inset-0 z-50 grid place-items-center bg-void/70 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.form
        className="glass-panel w-full max-w-xl rounded-lg p-5"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onSubmit={(event) => {
          event.preventDefault();
          void updateNote({ ...selectedNote, title, area, content });
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase text-coral">Nota neural</p>
            <h2 className="mt-1 text-2xl font-semibold text-signal">{selectedNote.title}</h2>
          </div>
          <button
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-signal/15 bg-signal/5 text-signal hover:bg-signal hover:text-void"
            type="button"
            onClick={() => setSelectedNote(undefined)}
            title="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 grid gap-3">
          <input
            className="rounded-md border border-signal/10 bg-void/70 px-3 py-3 text-signal outline-none focus:border-coral"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <select
            className="rounded-md border border-signal/10 bg-void/70 px-3 py-3 text-signal outline-none focus:border-coral"
            value={area}
            onChange={(event) => setArea(event.target.value as BrainArea)}
          >
            {areas.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <textarea
            className="min-h-36 resize-none rounded-md border border-signal/10 bg-void/70 px-3 py-3 text-signal outline-none focus:border-coral"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>

        <button
          className="mt-5 inline-flex h-11 items-center gap-2 rounded-md bg-coral px-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-void hover:bg-ember"
          type="submit"
          title="Salvar"
        >
          <Save size={16} />
          Salvar
        </button>
      </motion.form>
    </motion.div>
  );
}
