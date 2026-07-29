# Porto Alegre Digital Commercial Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar em `https://leonardobrasil.com.br/porto-alegre-digital` uma landing executiva que apresente a implantação comercial e termine com o aceite para iniciar, sem preços ou contrato.

**Architecture:** A nova rota reutilizará o aplicativo React/Vite existente, com conteúdo tipado isolado em um módulo de dados, uma página própria e um componente interativo somente para o aceite. Um componente de chrome por rota ocultará a barra promocional nessa apresentação, enquanto `SeoHead`, o roteador cliente, o renderizador SSR e o pré-renderizador serão ampliados de forma mínima.

**Tech Stack:** React 18, TypeScript estrito, Vite 8, Tailwind CSS 3, React Helmet Async, Node Test Runner e Express 5.

## Global Constraints

- Implementar no repositório `leoferrazbrasil/leonardo-brasil` e na rota exata `/porto-alegre-digital`.
- Utilizar React funcional, TypeScript estrito e somente classes utilitárias Tailwind; não instalar dependências.
- Escrever todo o conteúdo visível em Português do Brasil com codificação UTF-8 válida.
- Manter o tema escuro premium do site, com fundo `#080d18`, dourado para destaques e azul apenas em ações funcionais.
- Apresentar 1,748 milhão como soma nominal dos três perfis, com aviso explícito de possível sobreposição.
- Apresentar as métricas como amostra de três publicações e não como previsão de desempenho.
- Descrever o CRM como próprio, personalizado e implantado progressivamente.
- Não mencionar Kommo ou RD Station na página.
- Não exibir preços, faixas de investimento, remuneração ou condições contratuais.
- Não prometer faturamento, vendas ou resultados garantidos.
- Manter a rota fora do sitemap e incluir `noindex, nofollow`.
- Não mostrar barra promocional, menu geral, rodapé comercial ou botão flutuante de WhatsApp.
- A última decisão visível deve ser: “Podemos iniciar a implantação desta operação comercial?”
- Não publicar PDF, DOCX, XLSX, CSV, orçamento, contato ou material interno.
- Preservar e não incluir em commits a modificação preexistente em `cofre-mestre-contexto-ia`.

---

## File Structure

### Arquivos a criar

- `src/data/portoAlegreDigital.ts` — tipos, indicadores, pilares, ofertas, rotina, metas e responsabilidades.
- `src/components/RouteAnnouncementBar.tsx` — decide se a barra promocional geral deve aparecer na rota atual.
- `src/components/PortoAlegreDecision.tsx` — controla o aceite local e revela os próximos passos sem enviar dados.
- `src/pages/PortoAlegreDigital.tsx` — compõe a narrativa e toda a interface da landing executiva.
- `server/porto-alegre-digital-content.test.mjs` — protege conteúdo, restrições comerciais e integração da rota.
- `scripts/verify-porto-alegre-digital.mjs` — valida o artefato pré-renderizado antes da publicação.
- `public/porto-alegre-digital/perfil-porto-alegre-oficial.png`
- `public/porto-alegre-digital/perfil-porto-alegre.png`
- `public/porto-alegre-digital/perfil-rio-grande-do-sul.png`
- `public/porto-alegre-digital/metricas-publicacao-01.webp`
- `public/porto-alegre-digital/metricas-publicacao-02.webp`
- `public/porto-alegre-digital/metricas-publicacao-03.webp`
- `public/porto-alegre-digital/script-vendas.png`

### Arquivos a modificar

- `src/components/SeoHead.tsx` — aceitar metadado `robots` opcional.
- `src/main.tsx` — carregar a página, registrar a rota e utilizar a barra condicional.
- `src/entry-server.tsx` — registrar a mesma rota no SSR e utilizar a barra condicional.
- `scripts/prerender.mjs` — gerar `dist/porto-alegre-digital/index.html`.
- `package.json` — adicionar o verificador específico à rotina de validação, sem dependências novas.

### Arquivos deliberadamente não modificados

- `scripts/generate-sitemap.mjs` — a ausência da rota é intencional.
- `public/sitemap.xml` — será regenerado pelo build sem a nova rota.
- `cofre-mestre-contexto-ia` — alteração preexistente fora do escopo.

---

### Task 1: Contrato de conteúdo e evidências

**Files:**
- Create: `server/porto-alegre-digital-content.test.mjs`
- Create: `src/data/portoAlegreDigital.ts`

**Interfaces:**
- Produces: `EcosystemProfile`, `Metric`, `Pillar`, `MonetizationLevel`, `RoutineBlock`, `ResponsibilityBlock`.
- Produces: `ECOSYSTEM_PROFILES`, `SAMPLE_METRICS`, `PILLARS`, `MONETIZATION_LEVELS`, `ROUTINE`, `FIRST_30_DAYS`, `NINETY_DAY_OUTCOMES`, `RESPONSIBILITIES`, `NEXT_48_HOURS`.
- Consumes: nenhuma interface de outra tarefa.

- [ ] **Step 1: Write the failing content-contract test**

Criar `server/porto-alegre-digital-content.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("Porto Alegre Digital content keeps the approved commercial contract", async () => {
  const source = await read("../src/data/portoAlegreDigital.ts");

  assert.match(source, /644_000/);
  assert.match(source, /521_000/);
  assert.match(source, /583_000/);
  assert.match(source, /1_748_000/);
  assert.match(source, /soma nominal/i);
  assert.match(source, /três publicações/i);
  assert.match(source, /633\.906/);
  assert.match(source, /visualizações/);
  assert.match(source, /66\.109/);
  assert.match(source, /interações/);
  assert.match(source, /CRM próprio/);
  assert.match(source, /implantação progressiva/i);
  assert.match(source, /400 contatos/);
  assert.match(source, /cinco contratos recorrentes/i);
  assert.match(source, /Podemos iniciar a implantação desta operação comercial\?/);

  assert.doesNotMatch(source, /R\$\s*\d/);
  assert.doesNotMatch(source, /Kommo/i);
  assert.doesNotMatch(source, /RD Station/i);
  assert.doesNotMatch(source, /resultado garantido/i);
});
```

- [ ] **Step 2: Run the test and verify it fails because the data module does not exist**

Run:

```powershell
node --test server/porto-alegre-digital-content.test.mjs
```

Expected: FAIL com erro `ENOENT` para `src/data/portoAlegreDigital.ts`.

- [ ] **Step 3: Implement the typed content module**

Criar `src/data/portoAlegreDigital.ts` com estas interfaces:

```ts
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
```

Adicionar os dados exatos:

```ts
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
    description: "Implantação progressiva de uma solução personalizada para vender, acompanhar entregas, prever receita e organizar renovações.",
  },
  {
    number: "02",
    title: "Prospecção",
    description: "Pesquisa, qualificação, contato e follow-up registrados com próximo passo definido.",
  },
  {
    number: "03",
    title: "Ofertas",
    description: "Uma escada comercial clara para entrada, prova de valor, recorrência e projetos especiais.",
  },
  {
    number: "04",
    title: "Rotina comercial",
    description: "Rituais diários, semanais e mensais para transformar atividade em aprendizado e previsibilidade.",
  },
  {
    number: "05",
    title: "Metas e acompanhamento",
    description: "Pipeline, forecast, conversões, ganhos, perdas e prioridades visíveis para a gestão.",
  },
] as const;

export const MONETIZATION_LEVELS: readonly MonetizationLevel[] = [
  {
    level: "Entrada",
    title: "Descoberta Local",
    description: "Primeira campanha para o anunciante experimentar alcance, execução e acompanhamento.",
  },
  {
    level: "Principal",
    title: "Presença Regional",
    description: "Combinação de formatos e perfis orientada ao objetivo comercial da empresa.",
  },
  {
    level: "Recorrência",
    title: "Presença Regional 90",
    description: "Continuidade planejada por 90 dias, com calendário, acompanhamento e renovação.",
  },
  {
    level: "Premium",
    title: "Projetos Especiais",
    description: "Ativações, coberturas, lançamentos, experiências e soluções construídas sob medida.",
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
```

- [ ] **Step 4: Run the content-contract test**

Run:

```powershell
node --test server/porto-alegre-digital-content.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit the content contract**

```powershell
git add -- 'server/porto-alegre-digital-content.test.mjs' 'src/data/portoAlegreDigital.ts'
git commit -m "feat: define Porto Alegre Digital commercial content"
```

---

### Task 2: SEO privado e chrome condicional

**Files:**
- Modify: `server/porto-alegre-digital-content.test.mjs`
- Modify: `src/components/SeoHead.tsx`
- Create: `src/components/RouteAnnouncementBar.tsx`
- Modify: `src/main.tsx`
- Modify: `src/entry-server.tsx`

**Interfaces:**
- Consumes: `useLocation(): { pathname: string }` de `src/lib/local-router.tsx`.
- Produces: `SeoHeadProps.robots?: string`.
- Produces: `RouteAnnouncementBar(): JSX.Element | null`.

- [ ] **Step 1: Add failing source-contract tests for robots and route chrome**

Acrescentar ao teste:

```js
test("private presentation exposes robots control and hides the global announcement", async () => {
  const seo = await read("../src/components/SeoHead.tsx");
  const routeBar = await read("../src/components/RouteAnnouncementBar.tsx");

  assert.match(seo, /robots\?: string/);
  assert.match(seo, /meta name="robots"/);
  assert.match(routeBar, /porto-alegre-digital/);
  assert.match(routeBar, /return null/);
  assert.match(routeBar, /AnnouncementBar/);
});
```

- [ ] **Step 2: Run the test and verify the new contract fails**

Run:

```powershell
node --test server/porto-alegre-digital-content.test.mjs
```

Expected: FAIL porque `RouteAnnouncementBar.tsx` ainda não existe.

- [ ] **Step 3: Extend SeoHead without changing default behavior**

Em `src/components/SeoHead.tsx`, adicionar à interface:

```ts
robots?: string;
```

Receber `robots` na desestruturação e renderizar dentro de `<Helmet>`:

```tsx
{robots && <meta name="robots" content={robots} />}
```

Não definir valor padrão. Assim, as demais páginas continuam sem alteração de metadado.

- [ ] **Step 4: Create the route-aware announcement component**

Criar `src/components/RouteAnnouncementBar.tsx`:

```tsx
import { useLocation } from "../lib/local-router";
import { AnnouncementBar } from "./AnnouncementBar";

const ROUTES_WITHOUT_ANNOUNCEMENT = new Set([
  "/porto-alegre-digital",
]);

export function RouteAnnouncementBar() {
  const { pathname } = useLocation();

  if (ROUTES_WITHOUT_ANNOUNCEMENT.has(pathname)) {
    return null;
  }

  return <AnnouncementBar />;
}
```

- [ ] **Step 5: Replace the global announcement in both render trees**

Em `src/main.tsx` e `src/entry-server.tsx`:

```ts
import { RouteAnnouncementBar } from "./components/RouteAnnouncementBar";
```

Substituir:

```tsx
<AnnouncementBar />
```

por:

```tsx
<RouteAnnouncementBar />
```

Remover o import direto de `AnnouncementBar` dos dois arquivos.

- [ ] **Step 6: Run focused and type checks**

Run:

```powershell
node --test server/porto-alegre-digital-content.test.mjs
npm run typecheck
```

Expected: ambos PASS.

- [ ] **Step 7: Commit the isolated page chrome**

```powershell
git add -- 'server/porto-alegre-digital-content.test.mjs' 'src/components/SeoHead.tsx' 'src/components/RouteAnnouncementBar.tsx' 'src/main.tsx' 'src/entry-server.tsx'
git commit -m "feat: isolate executive presentation chrome"
```

---

### Task 3: Página executiva e aceite local

**Files:**
- Modify: `server/porto-alegre-digital-content.test.mjs`
- Create: `src/components/PortoAlegreDecision.tsx`
- Create: `src/pages/PortoAlegreDigital.tsx`
- Create: `public/porto-alegre-digital/perfil-porto-alegre-oficial.png`
- Create: `public/porto-alegre-digital/perfil-porto-alegre.png`
- Create: `public/porto-alegre-digital/perfil-rio-grande-do-sul.png`
- Create: `public/porto-alegre-digital/metricas-publicacao-01.webp`
- Create: `public/porto-alegre-digital/metricas-publicacao-02.webp`
- Create: `public/porto-alegre-digital/metricas-publicacao-03.webp`
- Create: `public/porto-alegre-digital/script-vendas.png`

**Interfaces:**
- Consumes: todas as constantes exportadas por `src/data/portoAlegreDigital.ts`.
- Consumes: `SeoHead({ robots?: string, includeBrandGraph?: boolean })`.
- Produces: `PortoAlegreDecision({ question, nextSteps })`.
- Produces: `PortoAlegreDigital(): JSX.Element`.

- [ ] **Step 1: Add failing page-contract tests**

Acrescentar ao arquivo de teste:

```js
test("executive page keeps the meeting flow and local-only acceptance", async () => {
  const page = await read("../src/pages/PortoAlegreDigital.tsx");
  const decision = await read("../src/components/PortoAlegreDecision.tsx");

  assert.match(page, /robots="noindex, nofollow"/);
  assert.match(page, /includeBrandGraph=\{false\}/);
  assert.match(page, /id="oportunidade"/);
  assert.match(page, /id="operacao"/);
  assert.match(page, /id="rotina"/);
  assert.match(page, /id="plano-90-dias"/);
  assert.match(page, /PortoAlegreDecision/);
  assert.match(decision, /aria-expanded/);
  assert.match(decision, /Sim, vamos iniciar/);
  assert.doesNotMatch(page, /wa\.me|WhatsApp/i);
  assert.doesNotMatch(decision, /fetch\(|localStorage|sessionStorage/);
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```powershell
node --test server/porto-alegre-digital-content.test.mjs
```

Expected: FAIL porque os componentes ainda não existem.

- [ ] **Step 3: Copy only the approved visual assets**

Executar em PowerShell com caminhos literais:

```powershell
New-Item -ItemType Directory -Force -Path 'public\porto-alegre-digital' | Out-Null
Copy-Item -LiteralPath 'D:\LEONARDO\Porto Alegre Oficial\perfil_portoalegreoficial.png' -Destination 'public\porto-alegre-digital\perfil-porto-alegre-oficial.png'
Copy-Item -LiteralPath 'D:\LEONARDO\Porto Alegre Oficial\perfil_portoalegre.png' -Destination 'public\porto-alegre-digital\perfil-porto-alegre.png'
Copy-Item -LiteralPath 'D:\LEONARDO\Porto Alegre Oficial\perfil_riograndedosul.png' -Destination 'public\porto-alegre-digital\perfil-rio-grande-do-sul.png'
Copy-Item -LiteralPath 'D:\LEONARDO\Porto Alegre Oficial\metricas_publicacao_01.webp' -Destination 'public\porto-alegre-digital\metricas-publicacao-01.webp'
Copy-Item -LiteralPath 'D:\LEONARDO\Porto Alegre Oficial\metricas_publicacao_02.webp' -Destination 'public\porto-alegre-digital\metricas-publicacao-02.webp'
Copy-Item -LiteralPath 'D:\LEONARDO\Porto Alegre Oficial\metricas_publicacao_03.webp' -Destination 'public\porto-alegre-digital\metricas-publicacao-03.webp'
Copy-Item -LiteralPath 'D:\LEONARDO\Porto Alegre Oficial\script_que_gerou_vendas.fw.png' -Destination 'public\porto-alegre-digital\script-vendas.png'
```

Verificar que somente esses sete arquivos foram copiados:

```powershell
Get-ChildItem -LiteralPath 'public\porto-alegre-digital' -File | Select-Object Name,Length
```

Expected: sete arquivos, todos com tamanho maior que zero.

- [ ] **Step 4: Implement the acceptance interaction**

Criar `src/components/PortoAlegreDecision.tsx`:

```tsx
import { useState } from "react";

interface PortoAlegreDecisionProps {
  question: string;
  nextSteps: readonly string[];
}

export function PortoAlegreDecision({
  question,
  nextSteps,
}: PortoAlegreDecisionProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <section
      id="decisao"
      aria-labelledby="decisao-titulo"
      className="relative overflow-hidden border-t border-gold-500/20 px-5 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,183,5,0.16),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-gold-400">
          A decisão de hoje
        </p>
        <h2
          id="decisao-titulo"
          className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-6xl"
        >
          {question}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Com o aceite, começamos pela organização dos acessos, metas e primeira versão operacional do CRM.
        </p>
        <button
          type="button"
          aria-expanded={accepted}
          aria-controls="proximas-48-horas"
          onClick={() => setAccepted(true)}
          className="mt-10 rounded-full bg-gold-500 px-8 py-4 text-base font-black text-ink shadow-[0_0_48px_rgba(242,183,5,0.28)] transition hover:bg-gold-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-4 focus-visible:ring-offset-ink active:scale-[0.98]"
        >
          Sim, vamos iniciar
        </button>

        {accepted && (
          <div
            id="proximas-48-horas"
            role="status"
            className="mx-auto mt-10 max-w-2xl rounded-3xl border border-gold-500/20 bg-panel/90 p-7 text-left"
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-gold-400">
              Próximas 48 horas
            </p>
            <ol className="mt-5 space-y-3">
              {nextSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-text">
                  <span className="font-black text-gold-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Implement the executive landing page**

Criar `src/pages/PortoAlegreDigital.tsx`.

Usar as seguintes propriedades de SEO:

```tsx
<SeoHead
  title="Plano de Implantação Comercial | Porto Alegre Digital"
  description="Plano executivo para estruturar CRM próprio, prospecção, ofertas, rotina comercial e acompanhamento de metas da Porto Alegre Digital."
  canonicalUrl="https://leonardobrasil.com.br/porto-alegre-digital"
  robots="noindex, nofollow"
  includeBrandGraph={false}
/>
```

Estruturar o componente nesta ordem exata:

```tsx
import { PortoAlegreDecision } from "../components/PortoAlegreDecision";
import { SeoHead } from "../components/SeoHead";
import {
  ECOSYSTEM_PROFILES,
  FINAL_QUESTION,
  FIRST_30_DAYS,
  FOLLOWER_CONTEXT,
  METRIC_CONTEXT,
  MONETIZATION_LEVELS,
  NEXT_48_HOURS,
  NINETY_DAY_OUTCOMES,
  PILLARS,
  RESPONSIBILITIES,
  ROUTINE,
  SAMPLE_METRICS,
} from "../data/portoAlegreDigital";

const NAV_ITEMS = [
  { href: "#oportunidade", label: "Oportunidade" },
  { href: "#operacao", label: "Operação" },
  { href: "#rotina", label: "Rotina" },
  { href: "#plano-90-dias", label: "90 dias" },
  { href: "#decisao", label: "Decisão" },
] as const;

export default function PortoAlegreDigital() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-text">
      <SeoHead
        title="Plano de Implantação Comercial | Porto Alegre Digital"
        description="Plano executivo para estruturar CRM próprio, prospecção, ofertas, rotina comercial e acompanhamento de metas da Porto Alegre Digital."
        canonicalUrl="https://leonardobrasil.com.br/porto-alegre-digital"
        robots="noindex, nofollow"
        includeBrandGraph={false}
      />

      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-line">
        <div className="h-full w-full origin-left bg-gold-500 [animation:lb-scroll-progress_auto_linear] [animation-timeline:scroll(root)]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <a href="#inicio" className="font-black tracking-tight text-text">
            Porto Alegre <span className="text-gold-400">Digital</span>
          </a>
          <nav aria-label="Navegação da apresentação" className="hidden gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-muted transition hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#decisao"
            className="rounded-full border border-gold-500/30 px-4 py-2 text-sm font-bold text-gold-400 transition hover:bg-gold-500/10"
          >
            Decisão
          </a>
        </div>
      </header>

      <main id="inicio">
        <section className="relative px-5 py-24 sm:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_10%,rgba(242,183,5,0.12),transparent_34%),radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_28%)]" />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-gold-400">
              Plano de implantação comercial
            </p>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
              Uma audiência regional forte. Agora, uma operação comercial à altura.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
              Um plano para transformar relevância local em prospecção, ofertas, acompanhamento e receita comercial com método.
            </p>
            <div className="mt-10 flex items-center gap-3 text-sm font-bold text-text">
              <span>Porto Alegre Digital</span>
              <span aria-hidden="true" className="h-px w-8 bg-gold-500/60" />
              <span>Leonardo Brasil</span>
            </div>
          </div>
        </section>

        <section id="oportunidade" className="scroll-mt-20 border-y border-line bg-panel/35 px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-gold-400">A oportunidade já existe</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">
              Três perfis. Relevância regional. Um ativo comercial pronto para ganhar sistema.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {ECOSYSTEM_PROFILES.map((profile) => (
                <article key={profile.handle} className="overflow-hidden rounded-3xl border border-line bg-ink">
                  <img
                    src={profile.image}
                    alt={`Perfil ${profile.handle} no Instagram`}
                    className="aspect-[4/3] w-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="flex items-end justify-between gap-3 p-5">
                    <h3 className="font-bold">{profile.handle}</h3>
                    <p className="text-2xl font-black text-gold-400">{profile.followersLabel}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">{FOLLOWER_CONTEXT}</p>

            <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {SAMPLE_METRICS.map((metric) => (
                <article key={metric.label} className="rounded-2xl border border-line bg-ink p-5">
                  <p className="text-2xl font-black tabular-nums text-text">{metric.value}</p>
                  <p className="mt-2 text-sm text-muted">{metric.label}</p>
                </article>
              ))}
            </div>
            <p className="mt-5 max-w-4xl text-sm leading-relaxed text-muted">{METRIC_CONTEXT}</p>
          </div>
        </section>

        <section className="px-5 py-20">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-line bg-panel p-7 sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-accent-400">Ativos existentes</p>
              <ul className="mt-6 space-y-4 text-lg">
                {["Audiência regional.", "Reconhecimento local.", "Capacidade de distribuição.", "Inventário de formatos e campanhas.", "Histórico de conteúdo e interação."].map((item) => (
                  <li key={item} className="border-b border-line pb-4">{item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl border border-gold-500/20 bg-gold-500/[0.04] p-7 sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold-400">Estrutura a implantar</p>
              <ul className="mt-6 space-y-4 text-lg">
                {["Pipeline e qualificação.", "Ofertas padronizadas.", "Cadências e follow-up.", "Forecast comercial.", "Acompanhamento de entregas e renovações."].map((item) => (
                  <li key={item} className="border-b border-gold-500/10 pb-4">{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section id="operacao" className="scroll-mt-20 border-y border-line bg-panel/35 px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-gold-400">A decisão proposta</p>
            <h2 className="mt-4 max-w-5xl text-4xl font-black tracking-tight sm:text-6xl">
              Leonardo lidera a implantação da operação comercial da Porto Alegre Digital.
            </h2>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {PILLARS.map((pillar) => (
                <article key={pillar.number} className="rounded-3xl border border-line bg-ink p-6">
                  <p className="text-sm font-black text-gold-400">{pillar.number}</p>
                  <h3 className="mt-5 text-xl font-black">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold-400">CRM próprio</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Construído para a forma como esta operação vende.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                A implantação começa pela versão operacional necessária para prospectar, acompanhar, entregar e renovar. O sistema evolui com os aprendizados reais da equipe.
              </p>
            </div>
            <div className="rounded-3xl border border-line bg-panel p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {["Empresas e contatos", "Origem e perfil", "Qualificação e score", "Pipeline e tarefas", "Propostas e perdas", "Campanhas e entregas", "Renovação e recorrência", "Metas e forecast"].map((capability) => (
                  <div key={capability} className="rounded-2xl border border-line bg-ink px-5 py-4 font-semibold">
                    {capability}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-panel/35 px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-gold-400">Arquitetura de monetização</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
              Uma escada para entrar, comprovar valor, permanecer e expandir.
            </h2>
            <div className="mt-12 grid gap-4 lg:grid-cols-4">
              {MONETIZATION_LEVELS.map((offer, index) => (
                <article key={offer.title} className="relative rounded-3xl border border-line bg-ink p-6">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-gold-400">{offer.level}</span>
                  <h3 className="mt-5 text-2xl font-black">{offer.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{offer.description}</p>
                  {index < MONETIZATION_LEVELS.length - 1 && (
                    <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden text-gold-400 lg:block">→</span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="rotina" className="scroll-mt-20 px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-gold-400">Rotina comercial na prática</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
              A previsibilidade nasce do que acontece todos os dias.
            </h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {ROUTINE.map((block) => (
                <article key={block.cadence} className="rounded-3xl border border-line bg-panel p-7">
                  <h3 className="text-2xl font-black text-gold-400">{block.cadence}</h3>
                  <ul className="mt-6 space-y-4">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3 text-muted">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="plano-90-dias" className="scroll-mt-20 border-y border-line bg-panel/35 px-5 py-20">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-line bg-ink p-7 sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-accent-400">Primeiros 30 dias</p>
              <h2 className="mt-4 text-3xl font-black">Implantar, testar e acompanhar.</h2>
              <ol className="mt-7 space-y-4">
                {FIRST_30_DAYS.map((item, index) => (
                  <li key={item} className="flex gap-4 text-muted">
                    <span className="font-black text-accent-400">{String(index + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-7 text-sm leading-relaxed text-muted">
                Referências operacionais iniciais, sujeitas à validação dos dados reais. São metas de processo, não promessas de faturamento.
              </p>
            </article>
            <article className="rounded-3xl border border-gold-500/20 bg-gold-500/[0.04] p-7 sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold-400">Horizonte de 90 dias</p>
              <h2 className="mt-4 text-3xl font-black">Transformar atividade em sistema.</h2>
              <ul className="mt-7 space-y-4">
                {NINETY_DAY_OUTCOMES.map((item) => (
                  <li key={item} className="border-b border-gold-500/10 pb-4 text-muted">{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-gold-400">Responsabilidades claras</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
              Liderança definida. Decisões sem ruído.
            </h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {RESPONSIBILITIES.map((block) => (
                <article key={block.owner} className="rounded-3xl border border-line bg-panel p-7 sm:p-9">
                  <h3 className="text-2xl font-black">{block.owner}</h3>
                  <ul className="mt-6 space-y-4 text-muted">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="text-gold-400">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PortoAlegreDecision question={FINAL_QUESTION} nextSteps={NEXT_48_HOURS} />
      </main>
    </div>
  );
}
```

Se a classe de animação baseada em scroll não for reconhecida pelo navegador, o indicador deve permanecer cheio e não pode ocultar conteúdo. Não adicionar CSS global para resolver um efeito apenas decorativo.

- [ ] **Step 6: Run focused tests and typecheck**

Run:

```powershell
node --test server/porto-alegre-digital-content.test.mjs
npm run typecheck
```

Expected: PASS.

- [ ] **Step 7: Commit the page and approved assets**

```powershell
git add -- 'server/porto-alegre-digital-content.test.mjs' 'src/components/PortoAlegreDecision.tsx' 'src/pages/PortoAlegreDigital.tsx' 'public/porto-alegre-digital'
git commit -m "feat: build Porto Alegre Digital executive landing"
```

---

### Task 4: Rota cliente, SSR e pré-renderização

**Files:**
- Modify: `server/porto-alegre-digital-content.test.mjs`
- Modify: `src/main.tsx`
- Modify: `src/entry-server.tsx`
- Modify: `scripts/prerender.mjs`

**Interfaces:**
- Consumes: `PortoAlegreDigital` como componente padrão.
- Produces: rota cliente e SSR `/porto-alegre-digital`.
- Produces: artefato `dist/porto-alegre-digital/index.html`.

- [ ] **Step 1: Add failing route-contract tests**

Acrescentar ao teste:

```js
test("executive page is registered in client, SSR, and prerender but not sitemap", async () => {
  const client = await read("../src/main.tsx");
  const server = await read("../src/entry-server.tsx");
  const prerender = await read("../scripts/prerender.mjs");
  const sitemap = await read("../scripts/generate-sitemap.mjs");

  assert.match(client, /path="\/porto-alegre-digital"/);
  assert.match(server, /path="\/porto-alegre-digital"/);
  assert.match(prerender, /"\/porto-alegre-digital"/);
  assert.doesNotMatch(sitemap, /porto-alegre-digital/);
});
```

- [ ] **Step 2: Run the focused test and verify route assertions fail**

Run:

```powershell
node --test server/porto-alegre-digital-content.test.mjs
```

Expected: FAIL nas três asserções de registro de rota.

- [ ] **Step 3: Register the lazy client route**

Em `src/main.tsx`, adicionar:

```ts
const PortoAlegreDigital = lazy(() => import("./pages/PortoAlegreDigital"));
```

E dentro de `<Routes>`:

```tsx
<Route path="/porto-alegre-digital" element={<PortoAlegreDigital />} />
```

- [ ] **Step 4: Register the SSR route**

Em `src/entry-server.tsx`, adicionar:

```ts
import PortoAlegreDigital from "./pages/PortoAlegreDigital";
```

E dentro de `<Routes>`:

```tsx
<Route path="/porto-alegre-digital" element={<PortoAlegreDigital />} />
```

- [ ] **Step 5: Register the static prerender route**

Em `scripts/prerender.mjs`, adicionar ao array `staticRoutes`:

```js
"/porto-alegre-digital",
```

Não alterar `scripts/generate-sitemap.mjs`.

- [ ] **Step 6: Run route test, typecheck, and build**

Run:

```powershell
node --test server/porto-alegre-digital-content.test.mjs
npm run typecheck
npm run build
```

Expected:

- teste PASS;
- TypeScript PASS;
- log do pré-renderizador sem falhas;
- arquivo `dist/porto-alegre-digital/index.html` existente.

- [ ] **Step 7: Verify built metadata and copy**

Run:

```powershell
rg -n 'noindex, nofollow|Podemos iniciar a implantação desta operação comercial|CRM próprio' 'dist/porto-alegre-digital/index.html'
rg -n 'porto-alegre-digital' 'dist/sitemap.xml' 'public/sitemap.xml'
```

Expected:

- o primeiro comando encontra os três contratos no HTML;
- o segundo comando não encontra a rota e retorna código 1.

- [ ] **Step 8: Commit route integration**

```powershell
git add -- 'server/porto-alegre-digital-content.test.mjs' 'src/main.tsx' 'src/entry-server.tsx' 'scripts/prerender.mjs'
git commit -m "feat: prerender Porto Alegre Digital presentation"
```

---

### Task 5: Verificador de publicação e revisão final

**Files:**
- Create: `scripts/verify-porto-alegre-digital.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `dist/porto-alegre-digital/index.html`, `public/sitemap.xml` e os sete ativos públicos.
- Produces: comando `npm run verify:porto-alegre`.

- [ ] **Step 1: Add the verification script entry**

Em `package.json`, adicionar em `scripts`:

```json
"verify:porto-alegre": "node scripts/verify-porto-alegre-digital.mjs"
```

- [ ] **Step 2: Run the missing script and verify it fails**

Run:

```powershell
npm run verify:porto-alegre
```

Expected: FAIL com `MODULE_NOT_FOUND` para `scripts/verify-porto-alegre-digital.mjs`.

- [ ] **Step 3: Implement the artifact verifier**

Criar `scripts/verify-porto-alegre-digital.mjs`:

```js
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const route = "/porto-alegre-digital";
const htmlPath = path.join(root, "dist", "porto-alegre-digital", "index.html");
const sitemapPath = path.join(root, "public", "sitemap.xml");
const assetDir = path.join(root, "public", "porto-alegre-digital");
const assets = [
  "perfil-porto-alegre-oficial.png",
  "perfil-porto-alegre.png",
  "perfil-rio-grande-do-sul.png",
  "metricas-publicacao-01.webp",
  "metricas-publicacao-02.webp",
  "metricas-publicacao-03.webp",
  "script-vendas.png",
];

assert.equal(existsSync(htmlPath), true, `HTML pré-renderizado ausente: ${htmlPath}`);

const html = readFileSync(htmlPath, "utf8");
const sitemap = readFileSync(sitemapPath, "utf8");

assert.match(html, /noindex, nofollow/);
assert.match(html, /Podemos iniciar a implantação desta operação comercial\?/);
assert.match(html, /CRM próprio/);
assert.doesNotMatch(html, /R\$\s*\d/);
assert.doesNotMatch(html, /Kommo|RD Station/i);
assert.doesNotMatch(sitemap, new RegExp(route));

for (const asset of assets) {
  const assetPath = path.join(assetDir, asset);
  assert.equal(existsSync(assetPath), true, `Ativo ausente: ${asset}`);
  assert.ok(statSync(assetPath).size > 0, `Ativo vazio: ${asset}`);
}

console.log("[porto-alegre-digital] HTML, conteúdo, sitemap e ativos validados.");
```

- [ ] **Step 4: Run the complete local verification**

Run:

```powershell
npm run verify
npm run verify:porto-alegre
```

Expected: ambos PASS.

- [ ] **Step 5: Start preview and verify HTTP delivery**

Iniciar sem janela visível:

```powershell
$process = Start-Process -FilePath 'npm.cmd' -ArgumentList @('run','preview','--','--host','127.0.0.1','--port','4173') -WorkingDirectory (Get-Location) -WindowStyle Hidden -PassThru
```

Verificar a rota:

```powershell
$response = Invoke-WebRequest -Uri 'http://127.0.0.1:4173/porto-alegre-digital' -TimeoutSec 20
[pscustomobject]@{
  Status = $response.StatusCode
  NoIndex = $response.Content.Contains('noindex, nofollow')
  Closing = $response.Content.Contains('Podemos iniciar a implantação desta operação comercial?')
}
```

Expected:

```text
Status  : 200
NoIndex : True
Closing : True
```

Encerrar somente o processo iniciado:

```powershell
Stop-Process -Id $process.Id
```

- [ ] **Step 6: Perform browser visual review**

Abrir `http://127.0.0.1:4173/porto-alegre-digital` e validar:

- desktop em 1440 × 900;
- celular em 390 × 844;
- barra promocional ausente;
- menu geral e WhatsApp ausentes;
- imagens legíveis e sem cortes que eliminem informações;
- navegação interna funcional;
- foco visível no botão;
- clique no aceite revela as cinco ações;
- nenhum scroll horizontal;
- última decisão visível preservada.

Corrigir qualquer divergência encontrada e repetir `npm run verify` e `npm run verify:porto-alegre`.

- [ ] **Step 7: Commit the verifier and final refinements**

```powershell
git add -- 'scripts/verify-porto-alegre-digital.mjs' 'package.json' 'src/pages/PortoAlegreDigital.tsx' 'src/components/PortoAlegreDecision.tsx'
git commit -m "test: verify Porto Alegre Digital presentation"
```

---

### Task 6: Versionamento, publicação e comprovação

**Files:**
- Verify only: todo o escopo versionado nas tarefas anteriores.

**Interfaces:**
- Consumes: branch `main`, remoto `origin` e build validado.
- Produces: URL pública confirmada na Hostinger.

- [ ] **Step 1: Audit the final Git scope**

Run:

```powershell
git status --short --branch
git diff --check
git log -5 --oneline
```

Expected:

- branch `main` à frente somente com os commits da landing;
- `cofre-mestre-contexto-ia` ainda aparece como modificação preexistente e não versionada;
- nenhum whitespace error;
- nenhum outro arquivo fora do escopo.

- [ ] **Step 2: Run one final clean verification**

Run:

```powershell
npm run verify
npm run verify:porto-alegre
```

Expected: PASS.

- [ ] **Step 3: Push the authorized branch**

Run:

```powershell
git push origin main
```

Expected: push aceito pelo remoto `leoferrazbrasil/leonardo-brasil`.

- [ ] **Step 4: Confirm the Hostinger deployment path**

Verificar no painel ou integração já existente se o push disparou a publicação do projeto. Não criar uma nova hospedagem, domínio ou configuração paralela.

Se a integração exigir um deploy manual já configurado, publicar exatamente o commit enviado.

- [ ] **Step 5: Verify the production URL**

Run:

```powershell
$response = Invoke-WebRequest -Uri 'https://leonardobrasil.com.br/porto-alegre-digital' -MaximumRedirection 5 -TimeoutSec 30
[pscustomobject]@{
  Status = $response.StatusCode
  FinalUrl = $response.BaseResponse.ResponseUri.AbsoluteUri
  NoIndex = $response.Content.Contains('noindex, nofollow')
  Closing = $response.Content.Contains('Podemos iniciar a implantação desta operação comercial?')
}
```

Expected:

```text
Status   : 200
FinalUrl : https://leonardobrasil.com.br/porto-alegre-digital
NoIndex  : True
Closing  : True
```

- [ ] **Step 6: Review production visually**

Abrir a URL final no navegador, repetir a revisão desktop e celular e testar o aceite. Confirmar que nenhuma informação de preço, contrato, planilha ou CRM interno foi exposta.

- [ ] **Step 7: Report the final handoff**

Entregar:

- URL pública;
- commit publicado;
- resultado de `npm run verify`;
- resultado de `npm run verify:porto-alegre`;
- confirmação HTTP 200;
- confirmação de `noindex, nofollow`;
- registro de que `cofre-mestre-contexto-ia` permaneceu fora do escopo.
