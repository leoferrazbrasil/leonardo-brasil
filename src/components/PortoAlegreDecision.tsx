import { useState } from "react";

interface PortoAlegreDecisionProps {
  question: string;
  nextSteps: readonly string[];
}

export function PortoAlegreDecision({
  question,
  nextSteps,
}: PortoAlegreDecisionProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <section
      id="decisao"
      aria-labelledby="decisao-titulo"
      className="relative overflow-hidden border-t border-gold-500/20 px-5 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,183,5,0.16),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-gold-400">
          A decisão de hoje
        </p>
        <h2
          id="decisao-titulo"
          className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-6xl"
        >
          {question}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Com o aceite, começamos pela organização dos acessos, metas e primeira
          versão operacional do CRM.
        </p>
        <button
          type="button"
          aria-expanded={accepted}
          aria-controls="proximas-48-horas"
          onClick={() => setAccepted(true)}
          className="mt-10 rounded-full bg-gold-500 px-8 py-4 text-base font-black text-ink shadow-[0_0_48px_rgba(242,183,5,0.28)] transition hover:bg-gold-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-4 focus-visible:ring-offset-ink active:scale-[0.98]"
        >
          Sim, vamos iniciar
        </button>

        {accepted && (
          <div
            id="proximas-48-horas"
            role="status"
            className="mx-auto mt-10 max-w-2xl rounded-3xl border border-gold-500/20 bg-panel/90 p-7 text-left"
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-gold-400">
              Próximas 48 horas
            </p>
            <ol className="mt-5 space-y-3">
              {nextSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-text">
                  <span className="font-black text-gold-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
