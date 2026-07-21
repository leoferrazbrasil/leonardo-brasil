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
- **Arquitetura Hub & Spoke:** O dicionário `blogData.ts` mapeia dois tipos de artigos: **Pilares** (Guias completos e definitivos) e **Satélites** (Dúvidas pontuais, ex: "Limites da OAB no Marketing").
- Artigos Satélites interlinkam e transferem autoridade automaticamente para o respectivo Artigo Pilar, e o Artigo Pilar encaminha a intenção de compra para a **Landing Page de Nicho**.

## 4. Sitemaps Inteligentes

O script `scripts/generate-sitemap.mjs` escaneia os dois dicionários (`niches.ts` e `blogData.ts`) via expressão regular (RegEx) a cada novo *build* (`npm run build`).
Isso garante que **100% das páginas publicadas (tanto LPs quanto Artigos do Blog) sejam instantaneamente reportadas ao Google**, sem necessidade de manutenção humana no arquivo XML.
