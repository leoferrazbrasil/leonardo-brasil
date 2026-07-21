---
title: Consultoria Comercial Estratégica (Nova Oferta)
tags:
  - produto
  - oferta
  - consultoria
  - b2b
date: 2026-07-21
---

# 💼 Consultoria Comercial Estratégica

Nova linha de oferta, lançada em `/consultoria`, distinta da "Estrutura de Vendas para Negócios Locais" (ver [[ICP_e_Regioes]]). Divulgada por uma faixa de anúncio dourada fixada no topo de **todas as páginas** do site.

## Por que uma segunda oferta?
O ICP principal (negócio local, autônomo, profissional liberal) tem ticket e maturidade menores. A Consultoria Comercial Estratégica mira empresas que **já vendem**, mas bateram no teto de crescimento e precisam de processo comercial, não de presença digital básica — um público mais avançado (e potencialmente mais corporativo) do que as landing pages de nicho atuais.

## Quem é o ICP desta oferta
- Empresas que já faturam, mas bateram no teto e não sabem por quê.
- Times comerciais sem processo, sem CRM e sem previsibilidade.
- Gestores que dependem 100% do "feeling" de quem vende.
- Negócios que cresceram no operacional, mas travaram no comercial.

> Nota: isso amplia o funil para além do "Red Flag" de grandes empresas descrito em [[ICP_e_Regioes]] — vale revisitar esse documento se a Consultoria passar a ser a oferta primária de aquisição.

## Estrutura da oferta (4 pilares)
1. **Diagnóstico Comercial** — raio-x do funil, processo e time.
2. **Estratégia e Processo** — desenho do funil comercial ideal, com metas e indicadores.
3. **Implantação** — CRM, scripts, rotinas e playbook comercial montados junto com o cliente.
4. **Acompanhamento e Escala** — acompanhamento semanal, ajuste do que não performa.

## Mecânica de divulgação
- **Faixa de anúncio (Announcement Bar):** dourada (`bg-gold`), fixa no topo de todo o site (implementada em `src/components/AnnouncementBar.tsx`, plugada globalmente em `main.tsx` acima das `Routes`). Dispensável pelo usuário (persistência via `localStorage`), reaparece em nova visita apenas se ainda não foi dispensada.
- **Link permanente no menu:** "Consultoria" adicionado à navegação de `App.tsx` e `NicheLanding.tsx` (desktop e mobile), em destaque dourado para diferenciar do "Blog" (azul).
- **CTA:** WhatsApp com mensagem pré-preenchida específica ("Quero saber mais sobre a Consultoria Comercial Estratégica para escalar as vendas da minha empresa"), permitindo segmentar esse lead do funil de negócio local no atendimento manual.

## Detalhes técnicos
Ver [[Brandbook_Diretrizes]] para a paleta dourada (`gold`) adicionada ao `tailwind.config.js` especificamente para esta oferta.
