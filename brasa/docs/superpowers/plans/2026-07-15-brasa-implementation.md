# Brasa Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a working React/Vite/TypeScript personal voice assistant UI named Brasa with 3D orb, 3D Second Brain graph, IndexedDB memory, AI/voice integration stubs, and memory tag interception.

**Architecture:** Keep domain behavior in pure `src/lib` modules covered by Vitest, browser persistence in `src/db`, integration boundaries in `src/services` and `src/hooks`, state in Zustand, and visual layers in focused React/R3F components. The first shippable slice runs fully locally with stubs when API keys/proxy are absent.

**Tech Stack:** React, Vite, TypeScript, Tailwind CSS, Framer Motion, Zustand, Dexie.js, Three.js, React Three Fiber, Drei, post-processing Bloom, react-force-graph-3d, Vitest.

## Global Constraints

- Falar com o usuario em portugues do Brasil.
- UI deve preencher 100% do viewport, sem margens brancas, frames, letterboxing ou molduras estruturais.
- Frontend nao deve depender de chaves hardcoded; `.env.local` documenta `VITE_ANTHROPIC_API_KEY`, `VITE_ELEVENLABS_API_KEY`, `VITE_STT_API_KEY`, mas o caminho recomendado e proxy local.
- STT deve suspender escuta enquanto TTS estiver falando para evitar loop de audio.
- Claude deve usar exatamente `[[SAVE:area|titulo|texto]]` para memoria nova.

---

### Task 1: Project Foundation And Domain Tests

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `index.html`
- Create: `src/lib/memoryTag.test.ts`, `src/lib/systemPrompt.test.ts`, `src/lib/graph.test.ts`

**Interfaces:**
- Produces tests for `parseSaveTags`, `buildSystemPrompt`, and `buildBrainGraph`.

- [x] Write failing tests for memory parsing, prompt construction and graph construction.
- [ ] Run `npm test` and verify failures are caused by missing implementation modules.

### Task 2: Core Domain Modules

**Files:**
- Create: `src/types/brain.ts`
- Create: `src/lib/memoryTag.ts`
- Create: `src/lib/systemPrompt.ts`
- Create: `src/lib/graph.ts`
- Create: `src/lib/initialNotes.ts`

**Interfaces:**
- `parseSaveTags(text: string): { cleanText: string; saves: SaveTagPayload[] }`
- `buildSystemPrompt(input: SystemPromptInput): string`
- `buildBrainGraph(notes: BrainNote[]): BrainGraph`

- [ ] Implement pure modules until Task 1 tests pass.

### Task 3: Persistence, Services And State

**Files:**
- Create: `src/db/brainDb.ts`
- Create: `src/services/aiClient.ts`, `src/services/voiceClient.ts`, `src/services/automationClient.ts`
- Create: `src/hooks/useAssistantRuntime.ts`, `src/hooks/useSpeechCapture.ts`
- Create: `src/store/assistantStore.ts`

**Interfaces:**
- Zustand store exposes assistant status, notes, selected note, command input, boot activation and memory save helpers.
- Service modules call local proxy routes and gracefully fall back to deterministic local responses when unavailable.

- [ ] Add IndexedDB persistence and integration stubs.
- [ ] Keep voice loop guarded by `isSpeaking` and `isListening`.

### Task 4: Cinematic Interface And 3D Layers

**Files:**
- Create: `src/main.tsx`, `src/App.tsx`, `src/styles.css`
- Create: `src/components/BootOverlay.tsx`, `src/components/AssistantShell.tsx`, `src/components/CommandConsole.tsx`, `src/components/NoteModal.tsx`
- Create: `src/components/OrbCanvas.tsx`, `src/components/NeuralGraph.tsx`
- Create: `src/types/react-force-graph-3d.d.ts`

**Interfaces:**
- The app fills the viewport, exposes activation, text input, microphone toggle, cancel audio, note modal editing and graph interaction.

- [ ] Build UI and 3D components.
- [ ] Run `npm run build` and resolve TypeScript/Vite issues.

### Task 5: Local Proxy And Documentation

**Files:**
- Create: `.env.example`
- Create: `server/dev-proxy.mjs`
- Create: `README.md`

**Interfaces:**
- `npm run dev` runs Vite.
- `npm run dev:proxy` runs optional local API proxy on port 8787.

- [ ] Document setup, keys, commands and security boundary.
- [ ] Run `npm test` and `npm run build` fresh before reporting status.
