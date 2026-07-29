export interface EcosystemProfile {
  handle: string;
  followers: number;
  followersLabel: string;
  image: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Pillar {
  number: string;
  title: string;
  description: string;
}

export interface MonetizationLevel {
  level: string;
  title: string;
  description: string;
}

export interface RoutineBlock {
  cadence: string;
  items: readonly string[];
}

export interface ResponsibilityBlock {
  owner: string;
  items: readonly string[];
}

export const ECOSYSTEM_PROFILES: readonly EcosystemProfile[] = [
  {
    handle: "@portoalegreoficial",
    followers: 644_000,
    followersLabel: "644 mil",
    image: "/porto-alegre-digital/perfil-porto-alegre-oficial.png",
  },
  {
    handle: "@portoalegre",
    followers: 521_000,
    followersLabel: "521 mil",
    image: "/porto-alegre-digital/perfil-porto-alegre.png",
  },
  {
    handle: "@riograndedosul",
    followers: 583_000,
    followersLabel: "583 mil",
    image: "/porto-alegre-digital/perfil-rio-grande-do-sul.png",
  },
] as const;

export const NOMINAL_FOLLOWERS = 1_748_000;

export const FOLLOWER_CONTEXT =
  "1,748 milhão é a soma nominal de seguidores dos três perfis. Pode haver sobreposição entre as audiências.";

export const SAMPLE_METRICS: readonly Metric[] = [
  { value: "633.906", label: "visualizações" },
  { value: "66.109", label: "interações" },
  { value: "≈ 28 mil", label: "compartilhamentos" },
  { value: "6.323", label: "salvamentos" },
  { value: "880", label: "ações no perfil" },
  { value: "10,43%", label: "interação sobre visualizações" },
] as const;

export const METRIC_CONTEXT =
  "Amostra de três publicações analisadas. Os dados demonstram capacidade de atenção e interação, sem representar garantia de desempenho futuro.";

export const PILLARS: readonly Pillar[] = [
  {
    number: "01",
    title: "CRM próprio",
    description:
      "Implantação progressiva de uma solução personalizada para vender, acompanhar entregas, prever receita e organizar renovações.",
  },
  {
    number: "02",
    title: "Prospecção",
    description:
      "Pesquisa, qualificação, contato e follow-up registrados com próximo passo definido.",
  },
  {
    number: "03",
    title: "Ofertas",
    description:
      "Uma escada comercial clara para entrada, prova de valor, recorrência e projetos especiais.",
  },
  {
    number: "04",
    title: "Rotina comercial",
    description:
      "Rituais diários, semanais e mensais para transformar atividade em aprendizado e previsibilidade.",
  },
  {
    number: "05",
    title: "Metas e acompanhamento",
    description:
      "Pipeline, forecast, conversões, ganhos, perdas e prioridades visíveis para a gestão.",
  },
] as const;

export const MONETIZATION_LEVELS: readonly MonetizationLevel[] = [
  {
    level: "Entrada",
    title: "Descoberta Local",
    description:
      "Primeira campanha para o anunciante experimentar alcance, execução e acompanhamento.",
  },
  {
    level: "Principal",
    title: "Presença Regional",
    description:
      "Combinação de formatos e perfis orientada ao objetivo comercial da empresa.",
  },
  {
    level: "Recorrência",
    title: "Presença Regional 90",
    description:
      "Continuidade planejada por 90 dias, com calendário, acompanhamento e renovação.",
  },
  {
    level: "Premium",
    title: "Projetos Especiais",
    description:
      "Ativações, coberturas, lançamentos, experiências e soluções construídas sob medida.",
  },
] as const;

export const ROUTINE: readonly RoutineBlock[] = [
  {
    cadence: "Diariamente",
    items: [
      "Pesquisar e qualificar empresas.",
      "Alimentar a lista de prospecção.",
      "Realizar contatos e follow-ups.",
      "Registrar cada avanço no CRM.",
      "Definir o próximo passo de toda oportunidade aberta.",
    ],
  },
  {
    cadence: "Semanalmente",
    items: [
      "Segunda: pipeline, prioridades, forecast e metas.",
      "Quarta: mensagens, objeções, propostas e oportunidades travadas.",
      "Sexta: ganhos, perdas, campanhas, aprendizados e próximos testes.",
    ],
  },
  {
    cadence: "Mensalmente",
    items: [
      "Revisar conversões.",
      "Recalibrar ICP, ofertas e cadências.",
      "Acompanhar recorrência e renovações.",
      "Redefinir prioridades e metas do ciclo seguinte.",
    ],
  },
] as const;

export const FIRST_30_DAYS = [
  "Primeira semana: configuração do sistema e base inicial de 100 leads.",
  "30 dias: 400 contatos trabalhados.",
  "10 diagnósticos comerciais.",
  "6 propostas.",
  "2 pilotos pagos.",
  "1 entrega acompanhada de ponta a ponta.",
] as const;

export const NINETY_DAY_OUTCOMES = [
  "Ciclo comercial validado.",
  "Mensagens e objeções documentadas.",
  "Casos iniciais registrados.",
  "Cinco contratos recorrentes como meta.",
  "Pipeline confiável e forecast utilizável.",
  "Rotina comercial incorporada à gestão.",
] as const;

export const RESPONSIBILITIES: readonly ResponsibilityBlock[] = [
  {
    owner: "Leonardo",
    items: [
      "Liderar o desenho e a implantação do CRM próprio.",
      "Estruturar prospecção, qualificação e ofertas.",
      "Conduzir a rotina comercial.",
      "Acompanhar pipeline, forecast e metas.",
      "Documentar aprendizados e propor ajustes.",
    ],
  },
  {
    owner: "Proprietário e empresa",
    items: [
      "Alinhar prioridades.",
      "Disponibilizar acessos e informações.",
      "Validar diretrizes comerciais.",
      "Aprovar decisões que dependam da empresa.",
      "Remover impedimentos operacionais.",
    ],
  },
] as const;

export const NEXT_48_HOURS = [
  "Reunião de início.",
  "Organização dos acessos.",
  "Validação do inventário comercial e das metas.",
  "Configuração da primeira versão do CRM.",
  "Início da primeira lista de prospecção.",
] as const;

export const FINAL_QUESTION =
  "Podemos iniciar a implantação desta operação comercial?";
