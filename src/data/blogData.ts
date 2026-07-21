export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl?: string;
  clusterType?: 'pillar' | 'satellite';
  pillarSlug?: string; // Se for satélite, aponta para o pilar
  content: string; // Markdown
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "como-captar-clientes-advocacia",
    title: "Como Captar Clientes na Advocacia pela Internet (Guia Definitivo 2026)",
    excerpt: "Pare de depender apenas de indicação. Aprenda a estruturar um funil comercial ético e alinhado ao provimento da OAB para atrair causas rentáveis.",
    date: "2026-07-20",
    author: "Leonardo Brasil",
    category: "Advogados",
    clusterType: "pillar",
    content: `
A maioria dos advogados são excelentes juristas, mas péssimos vendedores. Se o seu escritório depende exclusivamente de clientes indicados por amigos ou parentes, você não tem uma empresa: você tem um emprego instável.

No mercado jurídico atual, a **captação de clientes na internet** não é mais um diferencial, é questão de sobrevivência. Mas como fazer isso sem ferir o Código de Ética e Disciplina da OAB?

Neste guia completo, vou te mostrar a estrutura de vendas exata que aplicamos para escritórios B2B e High-Ticket.

## 1. O Paradoxo da OAB
A OAB proíbe a mercantilização da profissão, o que significa que você não pode fazer anúncios do tipo *"Faça seu divórcio por R$ 500"*. No entanto, o provimento 205/2021 modernizou o entendimento sobre Marketing Jurídico, permitindo o **marketing de conteúdo**.

A chave aqui é **intenção**. Se o cliente está no Google pesquisando *"advogado empresarial em São Paulo"*, ele não quer ver conteúdo; ele quer contratar alguém. Estar no topo dessa busca através do Google Ads não fere a ética, pois é o cliente que está buscando o serviço (Captação Passiva).

## 2. A Estrutura de Vendas Jurídica
Para parar de atender curiosos no WhatsApp e começar a fechar grandes contas, você precisa de um funil em 4 camadas:

### Camada 1: Presença (O Motor de Busca)
Seu site precisa ser uma Landing Page focada na dor do cliente. Em vez de *"Escritório Full Service"*, use *"Especialistas em Redução de Carga Tributária para Clínicas"*. Quando o cliente pesquisa a dor, ele te encontra.

### Camada 2: Aquisição (O Funil)
Campanhas de Google Ads na Rede de Pesquisa focadas em palavras-chave de **fundo de funil** (Alta Intenção). Deixamos as redes sociais apenas para construir Autoridade (Topo de Funil).

### Camada 3: Conversão (O Atendimento)
O gargalo de 90% dos advogados: demorar 4 horas para responder o WhatsApp. Quem procura advogado tem urgência. Você precisa de um CRM para não perder nenhum contato e um fluxo de atendimento que qualifique o lead antes de você, o sócio, falar com ele.

### Camada 4: Escala (O Processo)
Padronização da proposta de honorários e uso de automações (sem perder a personalização) para o follow-up de potenciais clientes.

---

> Quer aplicar essa exata estrutura no seu escritório e começar a receber leads qualificados todas as semanas?
> 
> 👉 **[Clique aqui para solicitar um diagnóstico comercial gratuito para o seu escritório](/estrutura-de-vendas-para-advogados)**.
`
  },
  {
    slug: "limites-marketing-juridico-oab",
    title: "O que a OAB permite no Marketing Jurídico? (Limites Práticos)",
    excerpt: "Uma análise prática do Provimento 205/2021. Descubra o que é mercantilização e como estruturar anúncios éticos no Google Ads.",
    date: "2026-07-21",
    author: "Leonardo Brasil",
    category: "Advogados",
    clusterType: "satellite",
    pillarSlug: "como-captar-clientes-advocacia",
    content: `
O medo da sanção disciplinar paralisa muitos advogados. A grande dúvida é sempre a mesma: *"Se eu anunciar no Google, o Tribunal de Ética vai me notificar?"*

A resposta curta é: **Não, desde que você faça da forma correta.**

O Novo Provimento (205/2021) do Conselho Federal da OAB trouxe clareza sobre o marketing jurídico na internet. Vamos desmistificar o que você *pode* e *não pode* fazer na sua estrutura de vendas.

## O que é Mercantilização?
A OAB proíbe a captação ativa imoderada e a mercantilização. Na prática, isso significa:
- **Proibido:** Prometer causa ganha.
- **Proibido:** Anunciar preços de honorários em redes sociais.
- **Proibido:** Frases de efeito puramente comerciais ("Ligue já", "O melhor advogado da cidade").

## O que é Permitido (A Captação Passiva)
O marketing de conteúdo e a informação são permitidos. Mais importante ainda: **o Google Ads (Links Patrocinados) é expressamente permitido pelo provimento.**

### Como estruturar o anúncio ético:
Se você faz um anúncio para a palavra-chave *"advogado trabalhista patronal"*, e o texto do anúncio diz *"Defesa Trabalhista para Empresas - Advocacia Especializada - Fale com um Advogado"*, você está sendo meramente informativo para alguém que ativamente buscou por esse serviço. 

Isso é **Captação Passiva**. O cliente buscou você, você apenas se fez presente.

### Redes Sociais vs. Google
No Instagram, o usuário está buscando entretenimento. Interromper o feed dele com uma propaganda do seu escritório soa agressivo e esbarra na mercantilização.
No Google, o usuário está com um problema (ex: recebimento de citação judicial) e busca a solução. Ele é um Lead Quente.

## Conclusão
O Google Ads, aliado a uma Landing Page informativa e sóbria, é o canal de aquisição mais seguro e rentável para a advocacia.

> Quer descobrir como montar essa máquina de aquisição no seu escritório dentro das regras da OAB?
> 
> 👉 **[Veja o Guia Definitivo de Captação para Advogados](/blog/como-captar-clientes-advocacia)**
`
  }
];
