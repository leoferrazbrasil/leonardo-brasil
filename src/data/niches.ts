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
    title: "Como Atrair Pacientes Particulares de Odontologia no Google | Leonardo Brasil",
    description: "Saia da dependência de convênios. Estruture a captação no Google e o atendimento do WhatsApp para fechar implantes e tratamentos odontológicos particulares.",
    badge: "Odontologia & Clínicas",
    h1: "Sua clínica odontológica depende de convênios ou indicações? Crie uma ",
    h1Highlight: "máquina de pacientes particulares.",
    subheadline: "Pare de perder orçamentos de alto valor no WhatsApp. Estruturamos o posicionamento no Google e o treinamento comercial da sua recepção para atrair pacientes particulares para implantes, próteses e alinhadores.",
    painPoints: [
      "Leads de implantes e próteses esquecidos sem follow-up na recepção",
      "Alta taxa de faltas e cancelamentos de consultas avaliativas",
      "Falta de previsibilidade financeira e margens esmagadas por convênios"
    ],
    ctaText: "Diagnóstico para sua Clínica Odontológica",
    waMessage: "Olá, Leonardo! Tenho uma clínica odontológica e quero atrair pacientes particulares para tratamentos de alto valor."
  },
  {
    slug: "medicos",
    title: "Como Atrair Pacientes Particulares para Consultórios Médicos | Leonardo Brasil",
    description: "Conquiste uma agenda médica 100% particular. Estruturação de marketing no Google Ads e treinamento de secretária consultiva para clínicas médicas.",
    badge: "Medicina & Consultórios",
    h1: "Agenda médica refém de repasses baixos de convênio? Foque em ",
    h1Highlight: "consultas particulares.",
    subheadline: "Você investiu anos na sua formação médica, mas sua recepção perde pacientes particulares diariamente por falta de processo comercial e follow-up no WhatsApp. Estruturamos sua captação High-Ticket.",
    painPoints: [
      "Dependência de repasses baixos e atrasados de convênios médicos",
      "Secretárias que passam o valor da consulta friamente sem qualificação",
      "Ausência de CRM para gerenciar retornos de check-up e procedimentos"
    ],
    ctaText: "Diagnóstico para seu Consultório Médico",
    waMessage: "Olá, Leonardo! Sou médico(a) e quero estruturar a captação de pacientes particulares para o meu consultório."
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
  },
  {
    slug: "advogados",
    title: "Estrutura de Vendas para Advogados | Leonardo Brasil",
    description: "Fugindo da guerra de preços e do marketing jurídico genérico? Estruture a aquisição do seu escritório para clientes de alto valor.",
    badge: "Advocacia",
    h1: "Cansado de clientes perguntando apenas preço? Construa ",
    h1Highlight: "autoridade online.",
    subheadline: "Advocacia não se vende com dancinha. Estruturamos seu funil no Google para interceptar clientes com demandas de alto ticket no momento em que eles procuram por um especialista.",
    painPoints: [
      "Leads desqualificados que só querem 'tirar uma dúvida'",
      "Dificuldade em cobrar honorários justos",
      "Marketing ineficaz que fere o código da OAB"
    ],
    ctaText: "Diagnóstico do seu Escritório",
    waMessage: "Olá, Leonardo! Sou advogado e quero estruturar minha aquisição de clientes."
  },
  {
    slug: "arquitetos",
    title: "Estrutura de Vendas para Arquitetos | Leonardo Brasil",
    description: "Atraia clientes ideais para projetos de arquitetura de alto padrão. Estruturação comercial para escritórios de arquitetura.",
    badge: "Arquitetura",
    h1: "Dependendo só de indicação para fechar projetos? Crie ",
    h1Highlight: "previsibilidade.",
    subheadline: "O Instagram não é suficiente se você não tem um processo para converter os contatos em reuniões. Montamos a estrutura comercial para fechar projetos completos, e não apenas consultorias avulsas.",
    painPoints: [
      "Muitas curtidas no Instagram, mas poucos orçamentos reais",
      "Clientes que acham o projeto 'caro' e vão para a concorrência",
      "Ciclo de vendas longo e sem acompanhamento (follow-up)"
    ],
    ctaText: "Diagnóstico para seu Escritório",
    waMessage: "Olá, Leonardo! Sou arquiteto(a) e quero atrair clientes de projetos de alto padrão."
  },
  {
    slug: "contadores",
    title: "Estrutura de Vendas para Contadores | Leonardo Brasil",
    description: "Venda contabilidade consultiva. Saia da guerra de preços com serviços básicos e atraia empresas de maior porte.",
    badge: "Contabilidade",
    h1: "Perdendo clientes para contabilidades online baratas? Mude seu ",
    h1Highlight: "posicionamento.",
    subheadline: "Se você vende apenas conformidade, será trocado por preço. Estruturamos o seu escritório contábil para vender soluções (BPO, consultoria, planejamento tributário) para empresários que valorizam resultado.",
    painPoints: [
      "Briga por honorários muito baixos",
      "Dificuldade em vender BPO Financeiro e serviços agregados",
      "Processo de vendas passivo (só espera indicação)"
    ],
    ctaText: "Diagnóstico do seu Escritório",
    waMessage: "Olá, Leonardo! Tenho um escritório de contabilidade e quero escalar minhas vendas."
  },
  {
    slug: "clinicas-de-estetica",
    title: "Estrutura de Vendas para Clínicas de Estética | Leonardo Brasil",
    description: "Lote a agenda da sua clínica com clientes interessados em procedimentos estéticos de alto ticket.",
    badge: "Estética Avançada",
    h1: "Vende apenas limpezas de pele avulsas? Aprenda a fechar ",
    h1Highlight: "planos de tratamento.",
    subheadline: "Sua clínica não precisa de mais promoções. Precisa de uma equipe de recepção treinada e campanhas focadas em quem tem poder aquisitivo para procedimentos avançados (harmonização, bioestimuladores).",
    painPoints: [
      "Agenda cheia, mas lucro baixo (procedimentos baratos)",
      "Recepção que só envia tabela de preços no WhatsApp e não vende",
      "Falta de controle (CRM) e de recompra das antigas clientes"
    ],
    ctaText: "Diagnóstico para sua Clínica",
    waMessage: "Olá, Leonardo! Tenho uma clínica de estética e quero vender mais planos de tratamento."
  }
];
