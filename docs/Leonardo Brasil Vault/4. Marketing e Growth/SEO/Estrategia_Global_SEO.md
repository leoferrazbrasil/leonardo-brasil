---
title: Estratégia de SEO e Topic Clusters - LPs de Nicho
tags:
  - seo
  - growth
  - landing-pages
  - aeo
date: 2026-07-20
---

# 🕸️ Estrutura Global de SEO e Topic Clusters

Este documento oficializa o motor de aquisição orgânica implementado na marca pessoal **Leonardo Brasil**, visando capturar leads de alta intenção e alto valor (High-Ticket) através de *Data-Driven Landing Pages*.

## 1. A Arquitetura Técnica

O projeto deixou de ser um site estático comum para se tornar um sistema dinâmico otimizado para o Googlebot e IAs:

- **Metadados e React Helmet:** Cada rota injeta dinamicamente o `<title>` e as descrições.
- **Answer Engine Optimization (AEO):** O arquivo `/llms.txt` foi criado para "ensinar" o ChatGPT e o Claude sobre a metodologia de vendas do Leonardo.
- **Offline Tracking:** O interceptador global no `src/lib/analytics.ts` anexa os dados de Sessão (`utm_source`, `gclid`) silenciosamente a cada clique no botão de WhatsApp. Isso permite a atribuição exata de vendas convertidas offline no CRM.
- **Code Splitting (LCP):** O roteamento via `React.lazy()` pulverizou o bundle inicial, acelerando enormemente o carregamento do site.

## 2. As Landing Pages de Nicho (Data-Driven)

Para evitar retrabalho de código, centralizamos o Copywriting em um único dicionário: `src/data/niches.ts`.
O componente genérico `NicheLanding.tsx` mapeia dinamicamente esse dicionário, gerando páginas exclusivas que atacam diretamente a dor de cada profissão.

### Nichos Implementados:
1. **Advogados (`/estrutura-de-vendas-para-advogados`):** Captação ética, B2B e High-Ticket, sem ferir a OAB.
2. **Clínicas de Estética (`/estrutura-de-vendas-para-estetica`):** Foco em pacientes LTV alto (Fios de PDO) e blindagem contra curiosos por preço.
3. **Arquitetos e Engenheiros (`/estrutura-de-vendas-para-arquitetos`):** Combate à "síndrome do render", foco em prospecção passiva corporativa.
4. **Médicos (`/estrutura-de-vendas-para-medicos`):** Captação de pacientes particulares para fugir de tabelas de convênio.
5. **Nutricionistas (`/estrutura-de-vendas-para-nutricionistas`):** Fechamento de planos de acompanhamento longo prazo.
6. **Contabilidade (`/estrutura-de-vendas-para-contabilidade`):** Captação B2B (Lucro Real/Presumido).

## 3. O Blog: Topic Clusters (Headless Markdown)

Para capturar leads Topo de Funil (dúvidas genéricas) e transferir Autoridade para as LPs de Nicho, implementamos um sistema de Blog focado em performance absoluta.
- Não usamos Banco de Dados ou CMS pesado; os artigos são lidos em tempo real via Markdown (`react-markdown`).
- **Arquitetura Hub & Spoke:** O dicionário `blogData.ts` mapeia dois tipos de artigos: **Pilares** (Guias completos e definitivos) e **Satélites** (Dúvidas pontuais).
- **Foco Primário (Saúde):** Os artigos iniciais foram pivotados para focar fortemente na captação High-Ticket de **Psicólogas** e **Nutricionistas**, atacando dores profundas (ex: desmame de planos de saúde, venda de programas vs consultas avulsas).
- **Sinalização E-E-A-T:** Implementamos a exibição dinâmica do **Avatar do Autor** nas páginas do blog para reforçar a Experiência, Especialidade, Autoridade e Confiabilidade (E-E-A-T) exigidas pelo algoritmo atual do Google para nichos *YMYL* (Your Money or Your Life).

## 4. SEO Programático (Multi-City SEO)

Para gerar tração geográfica orgânica escalável (e fugir do alto CPC de Ads nas capitais), a estrutura agora roda uma malha de **Gerador Programático Local**.
- **Cruzamento em Lote:** O sistema possui um dicionário de nichos (`niches.ts`) e um de regiões/cidades (`locations.ts`).
- **Rotas Bivalentes:** A Landing Page principal agora atende tanto por rotas genéricas (`/estrutura-de-vendas-para-psicologas`) quanto por rotas locais (`/estrutura-de-vendas-para-psicologas-em-sao-paulo`).
- **Injeção de Copy Dinâmica:** Quando a rota local é acionada, o React injeta o nome da cidade no `<title>` da aba e no `<H1>` da página de forma transparente, gerando hiper-relevância pro Lead local.

## 5. Sitemaps Inteligentes

O script `scripts/generate-sitemap.mjs` cruza os 7 nichos da saúde com as 25 cidades chave a cada novo *build*, e indexa todas as matrizes juntamente com os artigos do Blog. Atualmente, com um comando, disparamos centenas de Landing Pages únicas instantaneamente para o Google rastrear, sem necessidade de CMS manual.

## 6. Cross-sell interno para a Consultoria Comercial Estratégica

Desde 2026-07-21, uma faixa de anúncio global (topo de todas as páginas) direciona tráfego já capturado pelas Landing Pages de nicho para a nova oferta `/consultoria` (ver [[Consultoria_Comercial_Estrategica]]). É uma rota estática, adicionada manualmente a `STATIC_ROUTES` em `generate-sitemap.mjs` (não é gerada por cruzamento de dicionários como as LPs de nicho).
