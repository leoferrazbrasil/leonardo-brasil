export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorAvatar?: string;
  category: string;
  imageUrl?: string;
  clusterType?: 'pillar' | 'satellite';
  pillarSlug?: string; // Se for satélite, aponta para o pilar
  content: string; // Markdown
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "como-captar-pacientes-psicologia-particular",
    title: "Como Captar Pacientes Particulares de Psicologia (Sem Ferir o CRP)",
    excerpt: "Guia passo a passo para psicólogas saírem das plataformas de convênio e lotarem a agenda particular usando o Google.",
    date: "2026-07-20",
    author: "Leonardo Brasil",
    authorAvatar: "/avatar-leonardo-brasil.jpg",
    category: "Psicólogas",
    clusterType: "pillar",
    content: `
Muitas psicólogas entram em um ciclo perigoso de exaustão: trabalham horas seguidas atendendo por convênios ou plataformas de terapia online que pagam R$ 30 ou R$ 40 por sessão. Isso não é escalável e leva rapidamente ao *Burnout*.

A verdade é dolorosa, mas simples: se a sua agenda não tem pacientes particulares dispostos a pagar o valor justo pela sua sessão, você tem um problema de **Aquisição e Posicionamento**. 

Neste guia, vou te mostrar a estrutura exata que implementamos para psicólogas pararem de depender de indicações e começarem a atrair pacientes de alto valor éticamente (sem ferir o Código de Ética do CRP).

## 1. O Código de Ética do CRP
A principal trava da maioria das psicólogas é o medo de fazer marketing. O Conselho Regional de Psicologia permite a divulgação dos serviços, desde que seja feita de forma informativa e não sensacionalista. Você não pode garantir cura, nem usar termos mercantilistas agressivos.

Mas adivinhe onde os pacientes procuram terapia quando estão no momento de maior necessidade (ex: crise de ansiedade, luto, término de relacionamento)? **No Google.** E estar no Google não fere a ética; é apenas oferecer a porta quando o paciente bate.

## 2. A Estrutura de Vendas para Psicólogas
Para virar o jogo, aplicamos o método de 4 camadas:

### Camada 1: Presença (Sua "Vitrine" Clínica)
Você precisa de uma Landing Page focada na dor. Não um site dizendo *"Abordagem Cognitivo-Comportamental"*, mas sim um site dizendo *"Terapia focada no tratamento de Ansiedade Generalizada"*. O paciente não compra a abordagem, ele compra o alívio do sintoma.

### Camada 2: Aquisição (Google Ads Passivo)
Subimos campanhas focadas na rede de pesquisa. Quando alguém buscar *"psicóloga especialista em ansiedade em [Sua Cidade]"*, o seu consultório aparecerá em primeiro. Ele já quer o atendimento, você não está "forçando" a venda.

### Camada 3: Conversão (O Acolhimento)
O primeiro contato no WhatsApp não é uma venda, é um **acolhimento**. Sua recepção (ou você) precisa ter um roteiro que gere empatia, valide a dor do paciente e conduza naturalmente para o agendamento da primeira consulta particular, quebrando as objeções de preço.

### Camada 4: Escala (O Controle)
Uma vez que a agenda particular enche, você começa o processo de "desmame" dos planos de saúde e plataformas baratas. O foco muda para manter uma taxa de evasão baixa e fechar acompanhamentos longos.

---

> Quer aplicar essa estrutura no seu consultório e começar a receber contatos de pacientes particulares todos os dias?
> 
> 👉 **[Clique aqui para solicitar um diagnóstico comercial gratuito para o seu consultório](/estrutura-de-vendas-para-psicologas)**.
`
  },
  {
    slug: "vender-planos-nutricao-alto-valor",
    title: "Como Nutricionistas Podem Vender Planos de Alto Valor (Sem Instagram)",
    excerpt: "Você não precisa fazer dancinhas. Entenda como atrair clientes prontos para fechar acompanhamentos de 6 meses.",
    date: "2026-07-21",
    author: "Leonardo Brasil",
    authorAvatar: "/avatar-leonardo-brasil.jpg",
    category: "Nutricionistas",
    clusterType: "pillar",
    content: `
A rotina clássica da Nutricionista: postar receita fit no Instagram, fazer 10 stories por dia, e torcer para alguém mandar um *Direct* perguntando "qual o valor da consulta?".

Quando o paciente vem por esse caminho, ele geralmente está buscando **preço**, e não acompanhamento. O resultado? Uma agenda lotada de "consultas avulsas" de pessoas que nunca retornam, prejudicando tanto o faturamento do consultório quanto o resultado clínico do paciente (que precisa de tempo para ter resultados com a dieta).

A solução é focar em **High-Ticket**: vender pacotes e planos de acompanhamento (3 a 6 meses).

## Como Atrair o Cliente High-Ticket
O cliente que compra um programa completo de emagrecimento ou performance esportiva de R$ 1.500 não escolhe o profissional porque viu uma dancinha. Ele escolhe por **Autoridade e Confiança**.

### 1. Pare de brigar no Instagram, Vá para o Google
No Google, as pessoas buscam por *"Nutricionista Esportiva perto de mim"* ou *"Especialista em Emagrecimento Feminino"*. Esse é um tráfego de Altíssima Intenção. Ele já decidiu que vai pagar um nutricionista, ele só está escolhendo **qual**.

### 2. O Processo de Fechamento (Consultoria, não Consulta)
Quando o lead chega no WhatsApp, sua estrutura deve tratar aquele primeiro contato como uma "aplicação". Em vez de jogar o preço imediatamente, você ou sua equipe fazem perguntas qualificatórias: *"Há quanto tempo tenta emagrecer?"*, *"Qual a sua maior dificuldade hoje?"*.

Ao entender o contexto, a oferta muda de "Minha consulta é R$ 300" para "O seu caso exige o nosso Programa Metamorfose de 4 meses, que inclui protocolo alimentar, retornos mensais e acesso ao WhatsApp tira-dúvidas".

## O Funil de Vendas Invisível
Seu consultório precisa funcionar como um relógio:
- **Anúncios** rodam no Google e atraem a demanda diária.
- A **Landing Page** cria a autoridade e foca nos benefícios.
- O **WhatsApp** acolhe, qualifica e fecha o pacote.

É dessa forma que você passa a trabalhar menos horas, ganhando mais, com pacientes muito mais engajados no plano alimentar.

> Pare de viver de consultas avulsas. Vamos estruturar um funil de atração e fechamento de planos de acompanhamento de alto valor para o seu consultório.
> 
> 👉 **[Faça um diagnóstico do comercial da sua clínica comigo aqui](/estrutura-de-vendas-para-nutricionistas)**
`
  },
  {
    slug: "atrair-clientes-particulares-whatsapp",
    title: "Como atrair clientes particulares no WhatsApp (Sem depender de indicação)",
    excerpt: "Descubra como estruturar sua máquina de vendas local para receber contatos qualificados no WhatsApp todos os dias.",
    date: "2026-07-21",
    author: "Leonardo Brasil",
    category: "Vendas",
    clusterType: "pillar",
    content: `
A maior parte dos negócios locais e profissionais liberais hoje sofre de um mal silencioso: a **espera passiva**. Você abre o consultório ou escritório e fica esperando que antigos clientes indiquem novos.

A indicação é ótima, mas ela não traz previsibilidade. Você não sabe quantos clientes novos terá na próxima semana. Para escalar, você precisa de um processo previsível de captação de leads particulares no seu WhatsApp.

## Por que o WhatsApp?
O brasileiro não quer preencher formulários longos ou ligar para o número fixo. Ele quer mandar uma mensagem rápida no WhatsApp. O problema é que, sem estrutura, seu WhatsApp vira um balcão de informações onde as pessoas só perguntam *"qual o preço?"* e depois somem.

## O Método das 4 Camadas para o WhatsApp

### 1. Presença e Aquisição Otimizada
Você precisa dominar o **Google Meu Negócio** e ter campanhas de Google Ads rodando na sua região. Quem procura o seu serviço no Google tem a intenção de comprar agora. Quando a pessoa clica no seu anúncio, ela não deve ir para a Home de um site confuso, mas sim para uma Landing Page de alta conversão com um botão claro: *"Fale conosco no WhatsApp"*.

### 2. Abordagem Consultiva
Quando o lead cai no WhatsApp, o pior erro é enviar uma tabela de preços. O atendimento deve ser **consultivo**.
Use scripts de vendas que façam perguntas para entender o cenário do cliente antes de passar a solução. Isso ancorará o seu valor.

### 3. Follow-up (Acompanhamento)
A maioria das vendas não acontece no primeiro contato. Você precisa usar o recurso de Etiquetas do WhatsApp Business ou um CRM integrado para gerenciar quem ficou de responder, quem pediu orçamento e quem agendou retorno.

## Conclusão
O WhatsApp é a sua principal ferramenta de fechamento, mas ela só funciona se houver uma engrenagem de atração por trás.

> Pronto para ter um processo de vendas no WhatsApp que converte?
> 
> 👉 **[Agende uma sessão estratégica gratuita comigo e vamos desenhar sua estrutura](/estrutura-de-vendas-para-dentistas)**. *(Você pode acessar para outros nichos navegando no nosso site)*
`
  },
  {
    slug: "vale-a-pena-trafego-pago-local",
    title: "Vale a pena investir em Tráfego Pago Local? O que as agências não te contam",
    excerpt: "Por que tantos negócios locais perdem dinheiro com Facebook Ads e como você pode mudar isso focando em estrutura.",
    date: "2026-07-21",
    author: "Leonardo Brasil",
    category: "Tráfego Pago",
    clusterType: "satellite",
    content: `
"Já investi em tráfego pago e não tive resultado". Se eu ganhasse um real cada vez que ouço isso de um empresário, estaria aposentado.

A verdade é que as agências de marketing tradicionais vendem "tráfego pago" como se fosse uma mágica que salva negócios ruins. O tráfego pago (Google Ads, Meta Ads) é apenas um megafone: ele amplifica o que você já tem. Se você tem um processo de vendas péssimo, ele vai amplificar o seu prejuízo.

## O Maior Erro do Tráfego Local
A maioria dos negócios locais (clínicas, escritórios, serviços) erra em duas coisas ao anunciar:
1. **Focar apenas no Instagram/Facebook (Topo de Funil):** Onde as pessoas estão rolando o feed por lazer, e não procurando ativamente por um serviço.
2. **Falta de Destino (Para onde vai o lead?):** Mandar o lead do anúncio direto para um WhatsApp não treinado, ou pior, para o perfil do Instagram.

## A Estrutura Ideal
O que funciona de verdade para profissionais liberais e prestadores de serviço locais?

### 1. Foco no Google Ads (Fundo de Funil)
Antes de anunciar no Instagram, domine o Google da sua cidade. Quem pesquisa *"advogado tributarista em [Cidade]"* tem um problema urgente e dinheiro para resolver. É muito mais fácil vender para essa pessoa do que tentar convencer alguém no Instagram que ela precisa dos seus serviços.

### 2. Landing Page como Filtro
O clique do Google não deve ir para o seu WhatsApp direto. Ele deve ir para uma Landing Page. Por quê? A Landing Page serve para qualificar o cliente, aumentar o seu valor percebido, gerar autoridade e filtrar os curiosos.

### 3. CRM e Vendas
O lead chegou. Agora é hora da equipe de vendas atuar no WhatsApp com técnica, follow-up e organização.

**Resumo:** O tráfego pago local funciona e é essencial. Mas ele só dá ROI (Retorno sobre Investimento) quando é a ponta do iceberg de uma **Estrutura de Vendas** completa.

> Suas campanhas atuais não estão dando resultado? Provavelmente falta estrutura comercial.
> 
> 👉 **[Vamos fazer um diagnóstico gratuito do seu funil atual](/estrutura-de-vendas-para-advogados)**
`
  }
];
