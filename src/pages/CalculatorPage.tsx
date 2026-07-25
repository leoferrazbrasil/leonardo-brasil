import { useEffect } from "react";
import { Link } from "../lib/local-router";
import { SeoHead } from "../components/SeoHead";
import { SalesBottleneckCalculator } from "../components/SalesBottleneckCalculator";
import { Footer } from "../components/Footer";

export default function CalculatorPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-ink text-text font-sans">
      <SeoHead
        title="Calculadora de Gargalo Comercial no WhatsApp | Leonardo Brasil"
        description="Simule gratuitamente quanto faturamento sua clínica ou negócio local está deixando na mesa todo mês por falta de follow-up e processo de vendas."
        canonicalUrl="https://leonardobrasil.com.br/calculadora"
      />

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 font-extrabold tracking-tight hover:text-accent transition-colors">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-accent/15 border border-accent/30">
              <svg viewBox="0 0 48 48" className="w-[18px] h-[18px]" fill="none">
                <rect x="6" y="9" width="36" height="9" rx="4" fill="#3b82f6" opacity="0.4" />
                <rect x="13" y="21" width="22" height="9" rx="4" fill="#3b82f6" opacity="0.7" />
                <rect x="20" y="33" width="8" height="9" rx="4" fill="#60a5fa" />
              </svg>
            </span>
            Leonardo Brasil
          </Link>
          <nav className="flex gap-6">
            <Link to="/" className="text-sm font-medium text-muted hover:text-text transition-colors">
              Voltar ao Início
            </Link>
          </nav>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          {/* HERO */}
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1.5 text-xs font-bold text-accent-400 uppercase tracking-wide mb-4">
              Ferramenta Comercial Gratuita
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              Quanto dinheiro você deixa <span className="text-accent-400">na mesa todo mês?</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              Mova os controles abaixo para simular o potencial reprimido de vendas da sua operação e descubra quanto faturamento escapa do seu atendimento no WhatsApp.
            </p>
          </div>

          {/* COMPONENTE DA CALCULADORA */}
          <SalesBottleneckCalculator initialTicket={400} initialLeads={50} initialConversion={15} />

          {/* EXPLICAÇÃO TÉCNICA */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-line bg-panel p-6 space-y-3">
              <span className="text-2xl">📉</span>
              <h3 className="font-bold text-lg text-text">O Gargalo da Atencão</h3>
              <p className="text-sm text-muted leading-relaxed">
                Mais de 70% dos leads que chegam pelo WhatsApp são esquecidos após o primeiro orçamento por falta de um CRM e rotina de follow-up.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-panel p-6 space-y-3">
              <span className="text-2xl">⚙️</span>
              <h3 className="font-bold text-lg text-text">As 4 Camadas de Venda</h3>
              <p className="text-sm text-muted leading-relaxed">
                Para atingir a taxa benchmark de 35% de conversão, seu negócio precisa unir Presença, Aquisição, Conversão e Escala funcionando juntas.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-panel p-6 space-y-3">
              <span className="text-2xl">🤝</span>
              <h3 className="font-bold text-lg text-text">Diagnóstico Sem Custo</h3>
              <p className="text-sm text-muted leading-relaxed">
                Ao finalizar a simulação, agende um horário direto com Leonardo Brasil para analisar o gargalo exato da sua clínica ou serviço.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
