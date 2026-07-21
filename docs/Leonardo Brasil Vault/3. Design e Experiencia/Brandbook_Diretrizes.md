# Brandbook e Autoridade (E-E-A-T)

## 📌 O que é o Brandbook?
O **Brandbook da Leonardo Brasil** é uma Single Page Application (`/brandbook`) integrada ao ecossistema principal. Ela consolida as regras de design visual, tom de voz e posicionamento.

## 🎯 Objetivo Estratégico
Esta página tem dupla funcionalidade:
1. **Produtividade Interna:** Centralizar ativos (Cores com *copy-to-clipboard* de HEX, tamanhos de tipografia, ICPs) para designers e copywriters acelerarem campanhas futuras sem fugir do manual da marca.
2. **Sinalização E-E-A-T para SEO:** O Google favorece *entidades* bem documentadas. Ter um manual de marca transparente, ancorado no *Footer* de 100% das páginas do site, transmite confiabilidade, expertise e autoridade, separando o negócio de Landing Pages "fantasmas".

## 🎨 Diretrizes Visuais Core
- **Estética:** Premium, técnica e focada em resultados (Dark Mode Nativo).
- **Tipografia:** Família Inter / System UI, com pesos *Black* (900) para impacto agressivo em conversão e *Regular/Medium* para legibilidade de artigos densos.
- **Paleta de Cores:**
  - **Fundo / Backgrounds:** Ink (#0a0a0a) e Panel (#171717)
  - **Destaque / Ação:** Accent Blue (#3b82f6)
  - **Legibilidade:** Text Primary (#fafafa) e Muted (#a1a1aa)
  - **Destaque Premium (Gold):** #f2b705, adicionada em 2026-07-21 para diferenciar a oferta de [[Consultoria_Comercial_Estrategica]] (faixa de anúncio, CTAs e badges dessa página) do azul usado na oferta principal de Estrutura de Vendas.

## 🗣️ Tom de Voz & Posicionamento
- **Somos:** Consultivos, pragmáticos, focados em processo comercial.
- **Não somos:** Gurus de marketing, agências de venda de likes, ou informais em excesso.
- Falamos a linguagem de **estrutura de vendas**, ajudando Profissionais Liberais (nutricionistas, médicos, psicólogas) a abandonarem plantões de convênio para escalarem previsibilidade no atendimento High-Ticket.

## 🔗 Integração Técnica
- O Brandbook foi implementado utilizando **React Router** e **Tailwind CSS**.
- Integra uma barra lateral pegajosa inteligente (*Scroll-Spy via Intersection Observer*).
- O Link de acesso ao `/brandbook` transmite *Link Juice* global, estando inserido no Footer de `App.tsx`, `NicheLanding.tsx`, `BlogIndex.tsx`, `BlogPost.tsx` e `LegalPages.tsx`.
