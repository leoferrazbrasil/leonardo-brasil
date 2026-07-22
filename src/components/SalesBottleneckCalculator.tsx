import { useState } from "react";
import { trackLeadConversion } from "../lib/analytics";

interface CalculatorProps {
  initialTicket?: number;
  initialLeads?: number;
  initialConversion?: number;
  defaultNiche?: string;
  locationName?: string;
}

export function SalesBottleneckCalculator({
  initialTicket = 350,
  initialLeads = 40,
  initialConversion = 15,
  defaultNiche = "Geral",
  locationName,
}: CalculatorProps) {
  const [ticket, setTicket] = useState<number>(initialTicket);
  const [leads, setLeads] = useState<number>(initialLeads);
  const [conversion, setConversion] = useState<number>(initialConversion);

  // Estado do Formulário Secundário (Relatório)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cálculos Financeiros
  const currentSalesCount = Math.round(leads * (conversion / 100));
  const currentRevenue = currentSalesCount * ticket;

  // Benchmark de atendimento estruturado no WhatsApp (~35% de conversão)
  const potentialConversionRate = 35;
  const potentialSalesCount = Math.round(leads * (potentialConversionRate / 100));
  const potentialRevenue = potentialSalesCount * ticket;

  // Gargalo Mensal e Anual
  const monthlyBottleneck = Math.max(0, potentialRevenue - currentRevenue);
  const annualBottleneck = monthlyBottleneck * 12;

  // Formatador de Moeda BRL
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // Link do WhatsApp com mensagem pré-formatada dinamicamente
  const WHATSAPP_NUMBER = "5551992568861";
  const locationSuffix = locationName ? ` em ${locationName}` : "";
  const waMsg = `Olá, Leonardo! Fiz o cálculo no site e vi que estou deixando ${formatCurrency(
    monthlyBottleneck
  )}/mês na mesa no meu atendimento (${defaultNiche}${locationSuffix}). Quero um diagnóstico da minha estrutura.`;
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    // Dispara evento de conversão no GA4
    trackLeadConversion(`calculadora_relatorio_${defaultNiche}`);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 600);
  };

  return (
    <div className="rounded-3xl border border-accent/25 bg-panel p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Decorativo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, rgba(59,130,246,0.12), transparent 70%)",
        }}
      />

      <div className="relative z-10 grid lg:grid-cols-12 gap-10 items-start">
        {/* COLUNA ESQUERDA: INPUTS E SLIDERS */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-xs font-bold text-accent-400 uppercase tracking-wide">
              Simulador Interativo
            </span>
            <h3 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-text">
              Calcule seu <span className="text-accent-400">Gargalo Comercial</span>
            </h3>
            <p className="mt-2 text-sm text-muted">
              Descubra quanto faturamento sua empresa está perdendo todos os meses no atendimento do WhatsApp.
            </p>
          </div>

          <div className="space-y-6">
            {/* Input 1: Ticket Médio */}
            <div className="rounded-2xl border border-line bg-ink/60 p-5 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-bold text-text">
                  Ticket Médio da Consulta / Serviço
                </label>
                <span className="font-extrabold text-accent-400 text-lg tabular-nums">
                  {formatCurrency(ticket)}
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={5000}
                step={50}
                value={ticket}
                onChange={(e) => setTicket(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-line appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[11px] text-muted font-mono">
                <span>R$ 100</span>
                <span>R$ 2.500</span>
                <span>R$ 5.000+</span>
              </div>
            </div>

            {/* Input 2: Leads no WhatsApp por Mês */}
            <div className="rounded-2xl border border-line bg-ink/60 p-5 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-bold text-text">
                  Leads / Oportunidades no WhatsApp por Mês
                </label>
                <span className="font-extrabold text-accent-400 text-lg tabular-nums">
                  {leads} {leads === 1 ? "lead" : "leads"}
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={300}
                step={5}
                value={leads}
                onChange={(e) => setLeads(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-line appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[11px] text-muted font-mono">
                <span>5 leads</span>
                <span>150 leads</span>
                <span>300+ leads</span>
              </div>
            </div>

            {/* Input 3: Taxa de Conversão Atual */}
            <div className="rounded-2xl border border-line bg-ink/60 p-5 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="font-bold text-text">
                  Taxa de Conversão Atual estimada
                </label>
                <span className="font-extrabold text-accent-400 text-lg tabular-nums">
                  {conversion}% ({currentSalesCount} {currentSalesCount === 1 ? "venda" : "vendas"})
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={50}
                step={1}
                value={conversion}
                onChange={(e) => setConversion(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-line appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[11px] text-muted font-mono">
                <span>5% (Baixa)</span>
                <span>25% (Média)</span>
                <span>50% (Alta)</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: RESULTADOS E DUPLO CANAL DE CONVERSÃO */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
          {/* Card de Diagnóstico Financeiro */}
          <div className="rounded-3xl border border-line bg-ink p-6 space-y-6">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <span className="text-xs font-bold text-muted uppercase tracking-wider">
                Diagnóstico de Vendas
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-accent/15 text-accent-400 border border-accent/30">
                Ao Vivo
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted">Faturamento Atual:</span>
                <span className="text-base font-bold text-text tabular-nums">
                  {formatCurrency(currentRevenue)}/mês
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted">Potencial (Atendimento 35%):</span>
                <span className="text-base font-bold text-emerald-400 tabular-nums">
                  {formatCurrency(potentialRevenue)}/mês
                </span>
              </div>

              {/* O GARGALO (DESTAQUE) */}
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-center space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-red-400">
                  Gargalo Comercial Mensal
                </span>
                <div className="text-3xl sm:text-4xl font-black text-red-500 tabular-nums">
                  {formatCurrency(monthlyBottleneck)}
                </div>
                <p className="text-[11px] text-muted">
                  Deixados na mesa todos os meses por falta de follow-up.
                </p>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-muted">
                  Prejuízo acumulado em 1 ano:{" "}
                  <strong className="text-text font-bold tabular-nums">
                    {formatCurrency(annualBottleneck)}
                  </strong>
                </p>
              </div>
            </div>

            {/* AÇÃO PRINCIPAL (WHATSAPP DIRETO - LEAD QUENTE) */}
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex justify-center items-center gap-2.5 rounded-2xl bg-accent px-6 py-4 text-base font-extrabold text-white hover:bg-accent-600 transition-all active:scale-95 shadow-[0_0_30px_rgba(59,130,246,0.4)]"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.42 1.32-1.95 1.36-.5.04-.95.23-3.2-.67-2.7-1.07-4.42-3.83-4.55-4.01-.13-.18-1.1-1.46-1.1-2.78 0-1.32.69-1.97.94-2.24.24-.27.53-.33.7-.33.18 0 .35 0 .5.01.16.01.38-.06.6.46.24.55.8 1.9.87 2.04.07.13.12.29.02.47-.09.18-.14.29-.27.45-.13.16-.28.35-.4.47-.13.13-.27.28-.12.54.16.27.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.27.13.42.11.58-.07.16-.18.67-.78.85-1.05.18-.27.35-.22.6-.13.24.09 1.55.73 1.82.86.27.13.44.2.5.31.07.11.07.63-.17 1.32Z" />
              </svg>
              Recuperar {formatCurrency(monthlyBottleneck)} no WhatsApp
            </a>
          </div>

          {/* AÇÃO SECUNDÁRIA (FORMULÁRIO DE RELATÓRIO - LEAD MORNO) */}
          <div className="rounded-3xl border border-line bg-panel/60 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="grid place-items-center w-7 h-7 rounded-lg bg-accent/20 text-accent-400 text-xs font-bold">
                📄
              </span>
              <h4 className="text-sm font-bold text-text">
                Receber Plano de Recuperação por WhatsApp
              </h4>
            </div>

            {formSubmitted ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center text-xs text-emerald-400 font-semibold space-y-1">
                <p>✅ Solicitação enviada com sucesso!</p>
                <p className="text-[11px] text-muted font-normal">
                  Em instantes entraremos em contato com a simulação detalhada.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl border border-line bg-ink px-3.5 py-2.5 text-xs text-text placeholder:text-muted focus:border-accent focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp com DDD"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-xl border border-line bg-ink px-3.5 py-2.5 text-xs text-text placeholder:text-muted focus:border-accent focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-line bg-panel hover:bg-line px-4 py-2.5 text-xs font-bold text-text hover:text-accent-300 transition-all"
                >
                  {isSubmitting ? "Enviando..." : "Receber Relatório Detalhado"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
