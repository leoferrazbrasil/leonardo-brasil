import { motion } from 'framer-motion';
import { Power } from 'lucide-react';
import { useAssistantStore } from '../store/assistantStore';

export function BootOverlay() {
  const activate = useAssistantStore((state) => state.activate);

  return (
    <motion.div
      className="absolute inset-0 z-40 grid place-items-center bg-void"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="mb-8 h-36 w-36 rounded-full bg-coral/20 shadow-[0_0_90px_rgba(255,106,61,0.55)]" />
        <p className="font-mono text-xs uppercase tracking-[0.45em] text-coral">Sistemas prontos</p>
        <h2 className="mt-3 text-6xl font-semibold leading-none text-signal md:text-8xl">BRASA</h2>
        <button
          className="mt-10 inline-flex items-center gap-3 rounded-md border border-coral/50 bg-coral px-6 py-4 font-mono text-sm font-bold uppercase tracking-[0.22em] text-void shadow-glow transition hover:bg-ember focus:outline-none focus:ring-2 focus:ring-signal"
          type="button"
          onClick={() => void activate()}
          title="Ativar sistema"
        >
          <Power size={18} />
          ATIVAR SISTEMA
        </button>
      </motion.div>
    </motion.div>
  );
}
