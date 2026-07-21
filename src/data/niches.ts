export interface NicheData {
  slug: string;
  title: string; // Para tag <title>
  description: string; // Para meta description
  badge: string;
  h1: string;
  h1Highlight: string;
  subheadline: string;
  painPoints: string[];
  ctaText: string;
  waMessage: string;
}

export const NICHES: NicheData[] = [
  {
    slug: "dentistas",
    title: "Estrutura de Vendas para Clínicas Odontológicas | Leonardo Brasil",
    description: "Pare de depender apenas de indicações. Estruture o comercial da sua clínica odontológica para atrair tratamentos de alto valor e ter previsibilidade.",
    badge: "Odontologia",
    h1: "Sua clínica depende só de indicação? Falta um ",
    h1Highlight: "processo comercial.",
    subheadline: "Pare de perder leads no WhatsApp por falta de follow-up. Implementamos um funil focado em previsibilidade, para atrair pacientes particulares para implantes e harmonização, sem depender apenas de convênios.",
    painPoints: [
      "Leads perdidos por atendimento disperso no WhatsApp",
      "Falta de previsibilidade de caixa no fim do mês",
      "Follow-up falho e orçamentos esquecidos na gaveta"
    ],
    ctaText: "Diagnóstico para sua Clínica",
    waMessage: "Olá, Leonardo! Tenho uma clínica odontológica e quero parar de depender de indicações."
  },
  {
    slug: "medicos",
    title: "Estrutura de Vendas para Consultórios Médicos | Leonardo Brasil",
    description: "Conquiste uma agenda particular previsível. Estruturação de marketing e vendas para consultórios e clínicas médicas.",
    badge: "Medicina",
    h1: "Agenda refém de convênios que pagam pouco? Falta ",
    h1Highlight: "atrair pacientes particulares.",
    subheadline: "Você é um excelente médico, mas sua recepção pode estar perdendo pacientes particulares todos os dias por falta de treinamento em vendas e follow-up.",
    painPoints: [
      "Dependência extrema de convênios médicos",
      "Recepcionistas que não sabem vender a consulta particular",
      "Falta de um CRM para controlar retornos e check-ups"
    ],
    ctaText: "Diagnóstico para seu Consultório",
    waMessage: "Olá, Leonardo! Sou médico(a) e quero atrair mais pacientes particulares."
  },
  {
    slug: "psicologas",
    title: "Estrutura de Vendas para Psicólogas | Leonardo Brasil",
    description: "Pare de depender das plataformas de convênio. Estruture seu posicionamento no Google para atrair pacientes particulares de terapia.",
    badge: "Psicologia",
    h1: "Refém de plataformas de terapia online? Foque em ",
    h1Highlight: "pacientes particulares.",
    subheadline: "Psi, não aceite que plataformas desvalorizem o seu trabalho pagando uma fração da sessão. Estruturamos a sua aquisição no Google para atrair quem realmente busca e paga o valor justo pelo seu atendimento.",
    painPoints: [
      "Exaustão atendendo por plataformas de baixo custo",
      "Pacientes que desistem no primeiro contato de WhatsApp",
      "Falta de previsibilidade na agenda mensal"
    ],
    ctaText: "Diagnóstico para seu Consultório",
    waMessage: "Olá, Leonardo! Sou psicóloga e quero estruturar minha captação particular."
  },
  {
    slug: "nutricionistas",
    title: "Estrutura de Vendas para Nutricionistas | Leonardo Brasil",
    description: "Pare de vender consultas avulsas. Estruturamos o seu comercial para vender programas de acompanhamento nutricional de alto valor.",
    badge: "Nutrição",
    h1: "Pacientes que não retornam para reavaliação? Venda ",
    h1Highlight: "planos de acompanhamento.",
    subheadline: "Transforme consultas avulsas de R$ 250 em planos semestrais de R$ 1.500. Estruturamos a abordagem do seu WhatsApp para qualificar leads e vender o pacote completo logo no primeiro contato.",
    painPoints: [
      "Taxa de retorno baixa (pacientes desistem da dieta)",
      "Atendimento lento e sem histórico no WhatsApp",
      "Briga por preço com outros profissionais da região"
    ],
    ctaText: "Diagnóstico para seu Consultório",
    waMessage: "Olá, Leonardo! Sou nutricionista e quero estruturar meu processo de vendas."
  },
  {
    slug: "fisioterapeutas",
    title: "Estrutura de Vendas para Fisioterapeutas | Leonardo Brasil",
    description: "Destaque-se no Google e atraia pacientes particulares para RPG, Pilates e Reabilitação na sua clínica de Fisioterapia.",
    badge: "Fisioterapia",
    h1: "Perdendo pacientes para a concorrência? Domine as ",
    h1Highlight: "buscas no Google.",
    subheadline: "Quando o paciente sente dor, ele não vai pro Instagram, ele vai pro Google. Se a sua clínica não aparece nas primeiras posições com uma estrutura de conversão sólida, você está perdendo pacientes.",
    painPoints: [
      "Falta de previsibilidade de caixa (dependência de indicação)",
      "Leads perdidos por demora no atendimento do WhatsApp",
      "Dificuldade em vender pacotes fechados de fisioterapia"
    ],
    ctaText: "Diagnóstico para sua Clínica",
    waMessage: "Olá, Leonardo! Tenho uma clínica de fisioterapia e preciso estruturar as vendas."
  },
  {
    slug: "terapeutas",
    title: "Estrutura de Vendas para Terapeutas | Leonardo Brasil",
    description: "Estruture o seu posicionamento terapêutico e atraia clientes de alto valor com um funil de aquisição ético e passivo.",
    badge: "Terapia",
    h1: "Atraindo pessoas curiosas em vez de clientes pagantes? Melhore seu ",
    h1Highlight: "funil comercial.",
    subheadline: "Vender serviços terapêuticos exige confiança e qualificação. Substituímos a bagunça do WhatsApp por um processo comercial validado que educa e converte leads em clientes fiéis.",
    painPoints: [
      "Tempo perdido com pessoas pedindo descontos",
      "Falta de acompanhamento (follow-up) de antigos clientes",
      "Dificuldade de fechar processos terapêuticos completos"
    ],
    ctaText: "Diagnóstico para suas Sessões",
    waMessage: "Olá, Leonardo! Sou terapeuta e quero um diagnóstico para melhorar minhas vendas."
  },
  {
    slug: "massoterapeutas",
    title: "Estrutura de Vendas para Massoterapeutas | Leonardo Brasil",
    description: "Transforme a sua agenda vazia de massoterapia em uma máquina previsível de agendamentos e vendas de pacotes.",
    badge: "Massoterapia",
    h1: "Agenda vazia na sua clínica de massoterapia? Falta um ",
    h1Highlight: "processo de aquisição.",
    subheadline: "Você não precisa brigar por preço. Estruturamos seu comercial para focar nos diferenciais da sua técnica, atraindo clientes locais que pagam o valor justo e fecham pacotes mensais de massagem.",
    painPoints: [
      "Dependência extrema de promoções para atrair clientes",
      "Clientes que não fidelizam (compram apenas uma vez)",
      "Recepção desorganizada e sem CRM centralizado"
    ],
    ctaText: "Diagnóstico para seu Espaço",
    waMessage: "Olá, Leonardo! Sou massoterapeuta e preciso atrair clientes mais qualificados."
  }
];
