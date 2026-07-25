import { useState } from "react";
import { Link } from "../lib/local-router";

const DISMISS_KEY = "lb_announcement_consultoria_v1";

function isDismissed() {
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function AnnouncementBar() {
  const [visible, setVisible] = useState(() => !isDismissed());

  if (!visible) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // localStorage indisponível (modo privado, etc.) — apenas oculta na sessão atual
    }
    setVisible(false);
  };

  return (
    <div className="relative z-50 bg-gold text-ink">
      <div className="mx-auto max-w-6xl px-10 sm:px-12 py-2.5 flex items-center justify-center text-center">
        <Link
          to="/consultoria"
          className="text-xs sm:text-sm font-bold leading-snug hover:underline underline-offset-2 decoration-2"
        >
          <span className="font-black">Novidade:</span> Conheça minha Consultoria Comercial Estratégica para escalar suas vendas <span aria-hidden="true">-&gt;</span>
        </Link>
        <button
          onClick={dismiss}
          aria-label="Fechar aviso"
          className="absolute right-2 sm:right-4 p-1.5 text-ink/60 hover:text-ink transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="w-4 h-4">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
