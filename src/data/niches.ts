export interface NicheData {
  slug: string; // Ex: "advogados"
  title: string; // Meta title
  description: string; // Meta desc
  badge: string; // Ex: "Consultoria para Advogados"
  h1: React.ReactNode; // Título principal (pode conter span com cor)
  h1Highlight: string;
  subheadline: string; // Parágrafo abaixo do título
  painPoints: string[]; // 3 dores mapeadas no "Para quem"
  ctaText: string; // Ex: "Diagnóstico gratuito para seu escritório"
  waMessage: string; // Mensagem enviada pro WhatsApp
}

export const NICHES: NicheData[] = [
  {
    slug: "advogados",
    title: "Estrutura de Vendas para Advogados | Leonardo Brasil",
    description: "Pare de depender apenas de indicação. Monto uma estrutura de captação passiva de clientes para advogados no Google, sem infringir o provimento da OAB.",
    badge: "Escritórios de Advocacia",
    h1: "O seu escritório não precisa depender só de indicação. Falta ",
    h1Highlight: "estrutura de captação.",
    subheadline: "Advogado, você é bom no que faz. Mas se vive tirando dúvidas de graça no WhatsApp e não tem um fluxo previsível de clientes qualificados (High-Ticket), o problema não é o seu talento. É a falta de uma estrutura comercial passiva e ética.",
    painPoints: [
      "Fuga das restrições da OAB (mercantilização)",
      "Pare de tirar dúvidas no WhatsApp de graça",
      "Foque em clientes B2B e causas rentáveis (High-Ticket)"
    ],
    ctaText: "Diagnóstico para seu Escritório",
    waMessage: "Olá, Leonardo! Sou advogado e quero um diagnóstico gratuito da estrutura de captação do meu escritório."
  },
  {
    slug: "estetica",
    title: "Estrutura de Vendas para Clínicas de Estética | Leonardo Brasil",
    description: "Blinde a recepção da sua clínica contra curiosos de promoção. Implemente um CRM focado em LTV alto (Fios de PDO, Harmonização).",
    badge: "Clínicas de Estética",
    h1: "Sua clínica lotada de curiosos pedindo desconto? Falta ",
    h1Highlight: "estrutura de vendas.",
    subheadline: "Dona de clínica, se a sua recepção só responde 'qual o valor do botox' e a agenda vive ociosa, você precisa de um funil que filtre curiosos e foque em procedimentos de alto ticket (LTV), como fios de PDO e tecnologias.",
    painPoints: [
      "Blinde a recepção contra 'curiosos de promoção'",
      "Foque em tratamentos de LTV alto (High-Ticket)",
      "CRM para não perder follow-up de clientes avulsos"
    ],
    ctaText: "Diagnóstico para sua Clínica",
    waMessage: "Olá, Leonardo! Tenho uma clínica de estética e quero um diagnóstico gratuito para estruturar minhas vendas."
  },
  {
    slug: "arquitetos",
    title: "Estrutura de Vendas para Arquitetos | Leonardo Brasil",
    description: "Saia da 'síndrome do render no Instagram'. Capte clientes B2B e corporativos estruturando seu funil comercial.",
    badge: "Arquitetura e Engenharia",
    h1: "Cansado da síndrome do render no Instagram? Falta ",
    h1Highlight: "captar clientes reais.",
    subheadline: "Arquiteto e Engenheiro, você cria projetos incríveis, mas se vive competindo por reformas baratas enquanto perde grandes contas, o problema é a sua aquisição. Vamos estruturar um funil focado em investidores e projetos corporativos.",
    painPoints: [
      "Fuga da guerra de preços por reformas mínimas",
      "Atração passiva de investidores e B2B corporativo",
      "Acompanhamento (CRM) de longos ciclos de negociação"
    ],
    ctaText: "Diagnóstico para seu Escritório",
    waMessage: "Olá, Leonardo! Sou arquiteto/engenheiro e quero um diagnóstico para melhorar a captação de grandes projetos."
  },
  {
    slug: "medicos",
    title: "Estrutura de Vendas para Médicos e Clínicas | Leonardo Brasil",
    description: "Reduza a dependência de planos de saúde e escale sua agenda particular com uma estrutura de captação sólida.",
    badge: "Médicos e Clínicas",
    h1: "Agenda presa a planos de saúde que pagam mal? Falta ",
    h1Highlight: "atrair pacientes particulares.",
    subheadline: "Doutor, o paciente certo está procurando sua especialidade no Google agora mesmo, mas está agendando com a clínica concorrente. Monto a estrutura para você ser encontrado, acolhido no WhatsApp e agendado sem depender de plano de saúde.",
    painPoints: [
      "Redução drástica da dependência de planos de saúde",
      "Posicionamento local imbatível no Google",
      "Recepção treinada e estruturada (CRM de Saúde)"
    ],
    ctaText: "Diagnóstico para seu Consultório",
    waMessage: "Olá, Leonardo! Sou médico e quero um diagnóstico gratuito para escalar minha agenda particular."
  },
  {
    slug: "nutricionistas",
    title: "Estrutura de Vendas para Nutricionistas | Leonardo Brasil",
    description: "Pare de viver de consultas avulsas. Estruture seu atendimento para vender planos e acompanhamentos de longo prazo.",
    badge: "Nutricionistas",
    h1: "Vivendo apenas de consultas avulsas e pacientes sumidos? Falta ",
    h1Highlight: "escala e previsibilidade.",
    subheadline: "Nutri, você não deveria precisar implorar pelo retorno do paciente ou fazer dancinhas todo dia. Com um funil de vendas correto, você atrai leads quentes e a sua secretária fecha planos e acompanhamentos de longo prazo.",
    painPoints: [
      "Fim da guerra de preços por consultas isoladas",
      "Estruturação de vendas para planos de acompanhamento",
      "Rotina previsível sem depender 100% do Instagram"
    ],
    ctaText: "Diagnóstico para seu Negócio",
    waMessage: "Olá, Leonardo! Sou nutricionista e quero estruturar as vendas e captação do meu atendimento."
  },
  {
    slug: "contabilidade",
    title: "Estrutura de Vendas para Escritórios de Contabilidade | Leonardo Brasil",
    description: "Foque na migração tributária B2B e pare de brigar por honorários mínimos. Sua contabilidade precisa de um funil corporativo.",
    badge: "Escritórios de Contabilidade",
    h1: "Brigando por honorários mínimos de MEIs? Falta ",
    h1Highlight: "um funil corporativo B2B.",
    subheadline: "Contador, sua estrutura precisa atrair clientes empresariais (Lucro Presumido, Lucro Real) que valorizam segurança, não quem chora por 50 reais. Montamos a máquina de prospecção passiva para sua contabilidade no Google.",
    painPoints: [
      "Atração de clientes B2B estruturados",
      "Fuga da concorrência desleal das 'contabilidades online'",
      "CRM para nutrir migrações tributárias de alto valor"
    ],
    ctaText: "Diagnóstico para seu Escritório",
    waMessage: "Olá, Leonardo! Tenho um escritório de contabilidade e quero atrair contas B2B mais qualificadas."
  },
  {
    slug: "psicologas",
    title: "Estrutura de Vendas para Psicólogas | Leonardo Brasil",
    description: "Pare de depender das plataformas de convênio que pagam muito pouco. Estruture seu posicionamento no Google para atrair pacientes particulares de alto valor.",
    badge: "Psicólogas e Terapeutas",
    h1: "Agenda refém de convênios e plataformas baratas? Falta ",
    h1Highlight: "captação particular.",
    subheadline: "Psi, você não precisa fazer dancinhas no Instagram ou se sujeitar a plataformas que desvalorizam a sua sessão. Com um funil de captação ético no Google, o paciente certo encontra seu consultório no exato momento da necessidade.",
    painPoints: [
      "Fuga das plataformas de terapia de baixo custo",
      "Posicionamento exclusivo para Terapia Particular",
      "Triagem estruturada no WhatsApp para fechar mais sessões"
    ],
    ctaText: "Diagnóstico para seu Consultório",
    waMessage: "Olá, Leonardo! Sou psicóloga e quero um diagnóstico para atrair mais pacientes particulares."
  }
];
