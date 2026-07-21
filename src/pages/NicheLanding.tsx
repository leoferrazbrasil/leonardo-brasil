import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { SeoHead } from "../components/SeoHead";
import { NICHES } from "../data/niches";

// WhatsApp pessoal do Leonardo Brasil (só dígitos, DDI 55).
const WHATSAPP_NUMBER = "5551992568861";

const waLink = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

// --- Ícones ---
const WhatsApp = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.42 1.32-1.95 1.36-.5.04-.95.23-3.2-.67-2.7-1.07-4.42-3.83-4.55-4.01-.13-.18-1.1-1.46-1.1-2.78 0-1.32.69-1.97.94-2.24.24-.27.53-.33.7-.33.18 0 .35 0 .5.01.16.01.38-.06.6.46.24.55.8 1.9.87 2.04.07.13.12.29.02.47-.09.18-.14.29-.27.45-.13.16-.28.35-.4.47-.13.13-.27.28-.12.54.16.27.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.27.13.42.11.58-.07.16-.18.67-.78.85-1.05.18-.27.35-.22.6-.13.24.09 1.55.73 1.82.86.27.13.44.2.5.31.07.11.07.63-.17 1.32Z" />
  </svg>
);
const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
const Check = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
);
const Chevron = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
);

const CAMADAS = [
  { n: "01", nome: "Presença", frase: "Ser encontrado", desc: "Site profissional e Google Meu Negócio otimizado. Quando seu cliente pesquisa pela solução, é você que aparece." },
  { n: "02", nome: "Aquisição", frase: "Atrair clientes", desc: "Anúncios desenhados para capturar pessoas no momento da dor/desejo, trazendo leads de alta intenção." },
  { n: "03", nome: "Conversão", frase: "Fechar mais", desc: "WhatsApp estruturado e CRM: cada lead acompanhado do primeiro contato até o fechamento (follow-up)." },
  { n: "04", nome: "Escala", frase: "Crescer sem caos", desc: "Processos sistematizados e IA para escalar a captação sem depender 100% do seu tempo." },
];

const PASSOS = [
  { t: "Diagnóstico gratuito", d: "Você me chama no WhatsApp e identificamos exatamente onde seu funil está quebrado." },
  { t: "Montagem da estrutura", d: "Construímos camada por camada, focando primeiro no gargalo principal (geralmente aquisição ou CRM)." },
  { t: "Acompanhamento", d: "Ajusto o sistema até os leads chegarem qualificados e a sua equipe conseguir converter com previsibilidade." },
];

const FAQ = [
  { q: "Isso é uma agência de marketing?", a: "Não. Agência tradicional foca em 'gestão de mídias' e likes. Eu monto a sua estrutura comercial: o caminho inteiro entre o cliente te encontrar no Google, ser atendido e fechar contrato." },
  { q: "Preciso contratar tudo de uma vez?", a: "Não. Começamos pela camada que mais trava o seu faturamento hoje. O serviço é sob medida." },
  { q: "Quanto custa?", a: "O valor é fechado no diagnóstico, após eu entender a sua realidade. Nada de pacote genérico." },
];

const NAV = [
  { id: "metodo", label: "O Método" },
  { id: "para-quem", label: "Para quem" },
  { id: "faq", label: "FAQ" },
];

export default function NicheLanding() {
  const { slug } = useParams<{ slug: string }>();
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Busca os dados do nicho
  const nicheData = NICHES.find((n) => n.slug === slug);

  // Se a rota não bater com nenhum nicho registrado, manda pra home
  if (!nicheData) {
    return <Navigate to="/" replace />;
  }

  const { badge, h1, h1Highlight, subheadline, painPoints, ctaText, waMessage, title, description } = nicheData;
  const WA_LINK = waLink(waMessage);

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-ink text-text overflow-x-hidden font-sans">
      <SeoHead 
        title={title} 
        description={description} 
        canonicalUrl={`https://leonardobrasil.com.br/estrutura-de-vendas-para-${slug}`} 
        schema={faqSchema} 
      />
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-2.5 font-extrabold tracking-tight">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-accent/15 border border-accent/30">
              <svg viewBox="0 0 48 48" className="w-[18px] h-[18px]" fill="none"><rect x="6" y="9" width="36" height="9" rx="4" fill="#3b82f6" opacity="0.4" /><rect x="13" y="21" width="22" height="9" rx="4" fill="#3b82f6" opacity="0.7" /><rect x="20" y="33" width="8" height="9" rx="4" fill="#60a5fa" /></svg>
            </span>
            Leonardo Brasil
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link to="/blog" className="text-sm font-bold text-accent-400 hover:text-accent-300 transition-colors">Blog</Link>
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={(e) => scrollTo(e, n.id)} className="text-sm font-medium text-muted hover:text-text transition-colors">{n.label}</a>
            ))}
          </nav>
          <div className="hidden md:block">
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-all active:scale-95 shadow-[0_0_24px_rgba(59,130,246,0.35)]">
              Diagnóstico gratuito <Arrow className="w-4 h-4" />
            </a>
          </div>
          <button className="md:hidden p-2 -mr-2 text-muted" onClick={() => setMenu(!menu)} aria-label="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">{menu ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}</svg>
          </button>
        </div>
        {menu && (
          <div className="md:hidden border-t border-line bg-ink px-5 py-6 flex flex-col gap-5">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={(e) => scrollTo(e, n.id)} className="text-lg font-medium">{n.label}</a>
            ))}
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="mt-2 inline-flex justify-center items-center gap-2 rounded-full bg-accent px-5 py-3.5 font-bold text-white">Diagnóstico gratuito <Arrow className="w-5 h-5" /></a>
          </div>
        )}
      </header>

      <main id="top">
        {/* HERO DINÂMICO */}
        <section className="relative">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(60% 50% at 70% 0%, rgba(59,130,246,0.16), transparent 60%), radial-gradient(50% 40% at 10% 20%, rgba(37,99,235,0.10), transparent 60%)" }} />
          <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
            <div className="lb-rise">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 text-xs font-semibold text-accent-300">
                Especialista em Vendas · {badge}
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight text-balance">
                {h1}<span className="text-accent-400">{h1Highlight}</span>
              </h1>
              <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
                {subheadline}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-bold text-white hover:bg-accent-600 transition-all active:scale-95 shadow-[0_0_40px_rgba(59,130,246,0.35)]">
                  <WhatsApp className="w-5 h-5 shrink-0" /> {ctaText}
                </a>
              </div>
              <p className="mt-6 text-sm text-muted">Consultoria de Vendas Direta com Leonardo Brasil.</p>
            </div>

            {/* Foto */}
            <div className="lb-rise relative mx-auto w-full max-w-sm" style={{ animationDelay: "0.1s" }}>
              <div className="absolute -inset-4 rounded-[2rem] bg-accent/20 blur-3xl" />
              <div className="relative rounded-[1.75rem] overflow-hidden border border-line-strong bg-panel aspect-[4/5] shadow-2xl">
                <img
                  src="/leonardo.jpg"
                  alt="Leonardo Brasil"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget.style.display = "none"); }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-ink via-ink/70 to-transparent">
                  <p className="font-bold text-lg">Leonardo Brasil</p>
                  <p className="text-sm text-muted">Acelerador de Resultados para {badge}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAIXA 4 CAMADAS */}
        <section className="border-y border-line bg-panel/40">
          <div className="mx-auto max-w-6xl px-5 py-5 grid grid-cols-2 place-items-center gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-2 text-sm font-semibold tracking-wide">
            {CAMADAS.map((c, i) => (
              <span key={c.nome} className="flex items-center gap-6 text-muted">
                <span><span className="text-accent-400">{c.nome}</span></span>
                {i < CAMADAS.length - 1 && <span className="hidden sm:inline text-line-strong">·</span>}
              </span>
            ))}
          </div>
        </section>

        {/* PARA QUEM (DINÂMICO) */}
        <section id="para-quem" className="mx-auto max-w-6xl px-5 py-20 scroll-mt-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">O que a Estrutura de Vendas resolve para o seu negócio?</h2>
              <p className="mt-5 text-muted text-lg leading-relaxed">
                Você não precisa de likes ou de uma "agência". Você precisa que as pessoas certas encontrem sua especialidade e sejam bem atendidas no WhatsApp até fecharem o contrato.
              </p>
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-bold text-white hover:bg-accent-600 transition-all active:scale-95">
                <WhatsApp className="w-5 h-5" /> Falar comigo
              </a>
            </div>
            <div className="flex flex-col gap-4">
              {painPoints.map((p, i) => (
                <div key={i} className="rounded-xl border border-line bg-panel px-5 py-4 flex items-center gap-4 text-lg font-medium text-text/90 shadow-sm">
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-accent/20 text-accent-400 shrink-0">
                    <Check className="w-5 h-5" />
                  </span>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* O MÉTODO */}
        <section id="metodo" className="mx-auto max-w-6xl px-5 py-20 scroll-mt-16 bg-panel/30 border-y border-line">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">O método: 4 camadas que vendem juntas</h2>
            <p className="mt-4 text-muted text-lg">Começamos pela camada que mais trava o faturamento do seu nicho hoje.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 gap-5">
            {CAMADAS.map((c) => (
              <div key={c.n} className="rounded-2xl border border-line bg-panel p-7 hover:border-accent/40 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-black text-accent-400 tabular-nums">{c.n}</span>
                  <div>
                    <h3 className="text-xl font-bold leading-none">{c.nome}</h3>
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent-300">{c.frase}</span>
                  </div>
                </div>
                <p className="text-muted leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Como funciona</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {PASSOS.map((p, i) => (
              <div key={p.t} className="relative rounded-2xl border border-line bg-panel p-7">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-accent/15 border border-accent/30 text-accent-400 font-black">{i + 1}</span>
                <h3 className="mt-5 text-lg font-bold">{p.t}</h3>
                <p className="mt-2 text-muted leading-relaxed text-sm">{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-y border-line bg-panel/30">
          <div className="mx-auto max-w-3xl px-5 py-20 scroll-mt-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-center">Perguntas frequentes</h2>
            <div className="mt-10 flex flex-col gap-3">
              {FAQ.map((f, i) => (
                <div key={i} className="rounded-2xl border border-line bg-ink overflow-hidden">
                  <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold hover:bg-panel/50 transition-colors">
                    {f.q}
                    <Chevron className={`w-5 h-5 text-accent-400 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  {open === i && <p className="px-5 pb-5 -mt-1 text-muted leading-relaxed">{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="mx-auto max-w-6xl px-5 py-24">
          <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-panel p-10 sm:p-14 text-center">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(59,130,246,0.18), transparent 70%)" }} />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Vamos estruturar o seu negócio?</h2>
              <p className="mt-4 text-muted text-lg max-w-xl mx-auto">Chame no WhatsApp para entendermos onde está o gargalo do seu faturamento hoje.</p>
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-full sm:w-auto justify-center items-center gap-2 sm:gap-2.5 rounded-full bg-accent px-6 py-3.5 text-sm sm:px-9 sm:py-4 sm:text-lg font-bold text-white hover:bg-accent-600 transition-all active:scale-95 shadow-[0_0_50px_rgba(59,130,246,0.4)]">
                <WhatsApp className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" /> {ctaText}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/" onClick={() => window.scrollTo(0,0)} className="font-semibold text-text hover:text-accent transition-colors">Leonardo Brasil</Link>
            <a href="mailto:contato@leonardobrasil.com.br" className="hover:text-text transition-colors">contato@leonardobrasil.com.br</a>
          </div>
          <div className="mt-6 pt-6 border-t border-line text-center text-xs leading-relaxed text-muted/80">
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mb-3">
              <Link to="/termos" className="hover:text-text transition-colors">Termos</Link>
              <span className="text-line-strong">·</span>
              <Link to="/privacidade" className="hover:text-text transition-colors">Privacidade</Link>
              <span className="text-line-strong">·</span>
              <Link to="/exclusao-de-dados" className="hover:text-text transition-colors">Exclusão de Dados</Link>
            </div>
            <p>LEONARDO FERRAZ DA SILVA BRASIL · CNPJ 65.993.728/0001-07</p>
            <p className="mt-1">© {new Date().getFullYear()} · leonardobrasil.com.br</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
