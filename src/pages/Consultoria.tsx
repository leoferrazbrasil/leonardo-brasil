import { useState } from "react";
import { Link } from "../lib/local-router";
import { SeoHead } from "../components/SeoHead";
import { Footer } from "../components/Footer";

// WhatsApp pessoal do Leonardo Brasil (só dígitos, DDI 55).
const WHATSAPP_NUMBER = "5551992568861";

const waLink = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
const WA_CONSULTORIA = waLink("Olá, Leonardo! Quero saber mais sobre a Consultoria Comercial Estratégica para escalar as vendas da minha empresa.");

// --- Ícones inline (sem dependências) ---
const WhatsApp = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.42 1.32-1.95 1.36-.5.04-.95.23-3.2-.67-2.7-1.07-4.42-3.83-4.55-4.01-.13-.18-1.1-1.46-1.1-2.78 0-1.32.69-1.97.94-2.24.24-.27.53-.33.7-.33.18 0 .35 0 .5.01.16.01.38-.06.6.46.24.55.8 1.9.87 2.04.07.13.12.29.02.47-.09.18-.14.29-.27.45-.13.16-.28.35-.4.47-.13.13-.27.28-.12.54.16.27.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.27.13.42.11.58-.07.16-.18.67-.78.85-1.05.18-.27.35-.22.6-.13.24.09 1.55.73 1.82.86.27.13.44.2.5.31.07.11.07.63-.17 1.32Z" />
  </svg>
);
const Check = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
);
const Chevron = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
);

const PILARES = [
  { n: "01", nome: "Diagnóstico Comercial", desc: "Raio-x completo do funil, do processo e do time. Eu mapeio exatamente onde a sua empresa está perdendo venda hoje, sem achismo." },
  { n: "02", nome: "Estratégia e Processo", desc: "Desenho do funil comercial ideal para o seu momento, dos leads ao fechamento, com metas, indicadores e papéis claros." },
  { n: "03", nome: "Implantação", desc: "Monto com você o CRM, os scripts, as rotinas e o playbook comercial. Nada de teoria solta, é ferramenta rodando." },
  { n: "04", nome: "Acompanhamento e Escala", desc: "Acompanho a operação semana a semana, ajusto o que não performa e escalo o que já está funcionando." },
];

const PARA_QUEM = [
  "Empresas que já faturam, mas bateram no teto e não sabem por quê",
  "Times comerciais sem processo, sem CRM e sem previsibilidade",
  "Gestores que dependem 100% do \"feeling\" de quem vende",
  "Negócios que cresceram no operacional, mas travaram no comercial",
];

const PASSOS = [
  { t: "Diagnóstico gratuito", d: "Conversamos no WhatsApp e eu entendo o momento da sua empresa, o time e onde está o gargalo comercial hoje." },
  { t: "Plano estratégico", d: "Você recebe um plano objetivo, com prioridades claras, sem enrolação e sem pacote genérico de consultoria." },
  { t: "Execução lado a lado", d: "Implanto com você (ou com seu time), acompanho os números de perto e ajusto até vender de forma previsível." },
];

const FAQ = [
  { q: "Isso é mentoria ou consultoria?", a: "É consultoria prática. Não fico só dando conselho, entro junto na implantação: desenho o processo, monto o CRM e acompanho a operação até os números melhorarem de verdade." },
  { q: "Serve para qualquer empresa?", a: "Serve para empresas que já vendem e querem vender mais com processo, times comerciais sem estrutura e negócios que sentem que o crescimento parou de depender de esforço e passou a depender de método." },
  { q: "Quanto tempo dura a consultoria?", a: "Varia com o tamanho do gargalo. Alguns projetos são pontuais (desenho e implantação do processo), outros viram acompanhamento contínuo. Isso é definido junto com você no diagnóstico." },
  { q: "Quanto custa?", a: "O investimento é fechado depois do diagnóstico, de acordo com a complexidade do time e do processo comercial da sua empresa. Nada de tabela fixa, primeiro entendo o cenário, depois proponho." },
];

const NAV = [
  { id: "pilares", label: "O que entrego" },
  { id: "para-quem", label: "Para quem" },
  { id: "faq", label: "FAQ" },
];

export default function Consultoria() {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

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
        title="Consultoria Comercial Estratégica para Escalar Vendas"
        description="Consultoria comercial estratégica com Leonardo Brasil: diagnóstico, processo, CRM e acompanhamento para empresas que já vendem e querem escalar com previsibilidade."
        canonicalUrl="https://leonardobrasil.com.br/consultoria"
        schema={faqSchema}
      />

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 font-extrabold tracking-tight">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-accent/15 border border-accent/30">
              <svg viewBox="0 0 48 48" className="w-[18px] h-[18px]" fill="none"><rect x="6" y="9" width="36" height="9" rx="4" fill="#3b82f6" opacity="0.4" /><rect x="13" y="21" width="22" height="9" rx="4" fill="#3b82f6" opacity="0.7" /><rect x="20" y="33" width="8" height="9" rx="4" fill="#60a5fa" /></svg>
            </span>
            Leonardo Brasil
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link to="/calculadora" className="text-sm font-bold text-accent-400 hover:text-accent-300 transition-colors">Calculadora</Link>
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={(e) => scrollTo(e, n.id)} className="text-sm font-medium text-muted hover:text-text transition-colors">{n.label}</a>
            ))}
          </nav>
          <div className="hidden md:block">
            <a href={WA_CONSULTORIA} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-ink hover:bg-gold-400 transition-all active:scale-95 shadow-[0_0_24px_rgba(242,183,5,0.35)]">
              Falar com Leonardo
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
            <a href={WA_CONSULTORIA} target="_blank" rel="noreferrer" className="mt-2 inline-flex justify-center items-center gap-2 rounded-full bg-gold px-5 py-3.5 font-bold text-ink">Falar com Leonardo</a>
          </div>
        )}
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(60% 50% at 70% 0%, rgba(242,183,5,0.14), transparent 60%), radial-gradient(50% 40% at 10% 20%, rgba(37,99,235,0.10), transparent 60%)" }} />
          <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
            <div className="lb-rise">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 text-xs font-semibold text-gold-400">
                Consultoria Comercial Estratégica
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight text-balance">
                Escalar vendas não é sorte.<br />É <span className="text-gold-400">método</span>.
              </h1>
              <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
                Sou <strong className="text-text">Leonardo Brasil</strong>. Ajudo empresas que já vendem, mas querem vender mais, a montar um processo comercial com previsibilidade: diagnóstico, estratégia, implantação de CRM e acompanhamento até os números melhorarem de verdade.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href={WA_CONSULTORIA} target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-2 rounded-full bg-gold px-7 py-4 text-base font-bold text-ink hover:bg-gold-400 transition-all active:scale-95 shadow-[0_0_40px_rgba(242,183,5,0.35)]">
                  <WhatsApp className="w-5 h-5" /> Quero escalar minhas vendas
                </a>
                <a href="#pilares" onClick={(e) => scrollTo(e, "pilares")} className="inline-flex justify-center items-center gap-2 rounded-full border border-line-strong px-7 py-4 text-base font-semibold text-text hover:bg-panel transition-colors">
                  Ver o que entrego
                </a>
              </div>
              <p className="mt-6 text-sm text-muted">Fundador do <a href="https://funilcomercial.com" target="_blank" rel="noreferrer" className="text-accent-300 hover:underline">Funil Comercial</a> · Consultoria direta comigo.</p>
            </div>

            {/* Foto */}
            <div className="lb-rise relative mx-auto w-full max-w-sm" style={{ animationDelay: "0.1s" }}>
              <div className="absolute -inset-4 rounded-[2rem] bg-gold/15 blur-3xl" />
              <div className="relative rounded-[1.75rem] overflow-hidden border border-line-strong bg-panel aspect-[4/5] shadow-2xl">
                <img
                  src="/leonardo.jpg"
                  alt="Leonardo Brasil"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget.style.display = "none"); }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-ink via-ink/70 to-transparent">
                  <p className="font-bold text-lg">Leonardo Brasil</p>
                  <p className="text-sm text-muted">Consultoria Comercial Estratégica</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PARA QUEM */}
        <section id="para-quem" className="border-y border-line bg-panel/30">
          <div className="mx-auto max-w-6xl px-5 py-20 scroll-mt-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Para quem é essa consultoria</h2>
              <p className="mt-4 text-muted text-lg">Não é para quem está começando do zero. É para empresas que já vendem, mas sentem que o crescimento parou de depender de esforço e passou a depender de método.</p>
            </div>
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {PARA_QUEM.map((p) => (
                <div key={p} className="rounded-xl border border-line bg-panel px-5 py-4 flex items-center gap-4 text-lg font-medium text-text/90">
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-gold/15 text-gold-400 shrink-0">
                    <Check className="w-5 h-5" />
                  </span>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* O QUE ENTREGO — 4 pilares */}
        <section id="pilares" className="mx-auto max-w-6xl px-5 py-20 scroll-mt-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">O que eu entrego</h2>
            <p className="mt-4 text-muted text-lg">Não é uma lâmina de PowerPoint. É diagnóstico, processo e implantação, lado a lado com você.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 gap-5">
            {PILARES.map((p) => (
              <div key={p.n} className="rounded-2xl border border-line bg-panel p-7 hover:border-gold/40 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-black text-gold-400 tabular-nums">{p.n}</span>
                  <h3 className="text-xl font-bold leading-none">{p.nome}</h3>
                </div>
                <p className="text-muted leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMO FUNCIONA — 3 passos */}
        <section className="border-y border-line bg-panel/30">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Como funciona</h2>
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {PASSOS.map((p, i) => (
                <div key={p.t} className="relative rounded-2xl border border-line bg-ink p-7">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-gold/15 border border-gold/30 text-gold-400 font-black">{i + 1}</span>
                  <h3 className="mt-5 text-lg font-bold">{p.t}</h3>
                  <p className="mt-2 text-muted leading-relaxed text-sm">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROVA / AUTORIDADE */}
        <section className="mx-auto max-w-4xl px-5 py-20 text-center">
          <p className="text-2xl sm:text-3xl font-bold leading-snug text-balance">
            "Quem monta a estrutura, usa a própria estrutura. Não revendo ferramenta dos outros, <span className="text-gold-400">construí o meu próprio CRM</span> e entrego na sua empresa o mesmo método que uso todos os dias."
          </p>
          <p className="mt-6 text-muted font-semibold">Leonardo Brasil · Fundador do Funil Comercial</p>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-5 py-20 scroll-mt-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-center">Perguntas frequentes</h2>
          <div className="mt-10 flex flex-col gap-3">
            {FAQ.map((f, i) => (
              <div key={i} className="rounded-2xl border border-line bg-panel overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold">
                  {f.q}
                  <Chevron className={`w-5 h-5 text-gold-400 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <p className="px-5 pb-5 -mt-1 text-muted leading-relaxed">{f.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="mx-auto max-w-6xl px-5 pb-24">
          <div className="relative overflow-hidden rounded-3xl border border-gold/25 bg-panel p-10 sm:p-14 text-center">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(242,183,5,0.16), transparent 70%)" }} />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Vamos escalar as vendas da sua empresa?</h2>
              <p className="mt-4 text-muted text-lg max-w-xl mx-auto">Comece pelo diagnóstico gratuito. Em uma conversa no WhatsApp eu te mostro onde está o gargalo comercial hoje.</p>
              <a href={WA_CONSULTORIA} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-full sm:w-auto justify-center items-center gap-2 sm:gap-2.5 rounded-full bg-gold px-6 py-3.5 text-sm sm:px-9 sm:py-4 sm:text-lg font-bold text-ink hover:bg-gold-400 transition-all active:scale-95 shadow-[0_0_50px_rgba(242,183,5,0.4)]">
                <WhatsApp className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" /> Quero escalar minhas vendas
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
