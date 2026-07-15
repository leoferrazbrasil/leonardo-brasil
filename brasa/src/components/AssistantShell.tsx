import { motion } from 'framer-motion';
import { CommandConsole } from './CommandConsole';
import { NeuralGraph } from './NeuralGraph';
import { OrbCanvas } from './OrbCanvas';
import { useAssistantStore } from '../store/assistantStore';

export function AssistantShell() {
  const status = useAssistantStore((state) => state.status);
  const notes = useAssistantStore((state) => state.notes);
  const messages = useAssistantStore((state) => state.messages);

  return (
    <section className="relative h-full w-full overflow-hidden">
      <NeuralGraph />
      <div className="pointer-events-none absolute inset-0 scanline" />
      <div className="pointer-events-none absolute inset-0">
        <OrbCanvas />
      </div>

      <motion.header
        className="pointer-events-none absolute left-0 top-0 z-20 flex w-full items-start justify-between px-6 py-5 md:px-10"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-coral/80">BRASA</p>
          <h1 className="mt-1 text-3xl font-semibold leading-none text-signal md:text-5xl">Second Brain</h1>
        </div>
        <div className="text-right font-mono text-xs uppercase text-signal/70">
          <p>{status}</p>
          <p>{notes.length} notas</p>
        </div>
      </motion.header>

      <motion.aside
        className="glass-panel pointer-events-none absolute right-4 top-28 z-20 hidden w-80 rounded-lg p-4 lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <p className="font-mono text-xs uppercase text-coral/80">Últimos sinais</p>
        <div className="mt-3 space-y-3">
          {messages.slice(-3).map((message) => (
            <p key={message.id} className="text-sm leading-snug text-signal/80">
              <span className="font-mono uppercase text-ember">{message.role}</span> {message.content}
            </p>
          ))}
        </div>
      </motion.aside>

      <CommandConsole />
    </section>
  );
}
