# Brasa Hostinger Full-Stack Design Spec

## Objetivo

Evoluir o Brasa da publicação estática atual para uma aplicação full-stack Node na Hostinger, mantendo a interface React/Vite já publicada e adicionando um backend seguro para Claude, ElevenLabs, STT e webhooks n8n/Make.

## Decisão De Escopo

A próxima versão deve priorizar cérebro e voz reais antes de instalar novas skills especializadas. As skills de design, marketing, Obsidian e Graphify entram depois que a infraestrutura de IA/voz estiver operacional.

## Arquitetura Recomendada

Usar um servidor Node/Express all-in-one:

```text
brasa.leonardobrasil.com.br
├─ React/Vite frontend compilado em dist/
└─ Node/Express backend
   ├─ serve arquivos estáticos de dist/
   ├─ GET /api/health
   ├─ POST /api/anthropic/messages
   ├─ POST /api/elevenlabs/tts
   ├─ POST /api/stt/transcribe
   └─ POST /api/webhooks/automation
```

O frontend continua chamando rotas relativas `/api/...`, então o domínio público não muda e não há necessidade de CORS entre front e backend em produção.

## Backend

Criar `server/index.mjs` para produção. O servidor deve:

- usar `express`;
- servir `dist/` com cache longo para assets;
- servir `index.html` como fallback para rotas do app;
- limitar payloads JSON para comandos e mensagens;
- aceitar áudio bruto em `/api/stt/transcribe`;
- responder erros em JSON claro;
- nunca enviar chaves de API para o navegador;
- usar `process.env.PORT` quando disponível, com fallback local;
- ter `GET /api/health` retornando status, versão e quais integrações estão configuradas sem revelar segredos.

## Integrações

### Claude

Rota: `POST /api/anthropic/messages`

Entrada esperada:

```json
{
  "systemPrompt": "string",
  "messages": [],
  "userText": "string"
}
```

Variáveis:

- `ANTHROPIC_API_KEY`
- `ANTHROPIC_MODEL`

Comportamento:

- chamar `https://api.anthropic.com/v1/messages`;
- enviar apenas mensagens `user` e `assistant`;
- retornar `{ "text": "..." }`;
- retornar `503` se a integração não estiver configurada.

### ElevenLabs

Rota: `POST /api/elevenlabs/tts`

Entrada esperada:

```json
{ "text": "string" }
```

Variáveis:

- `ELEVENLABS_API_KEY`
- `ELEVENLABS_VOICE_ID`
- `ELEVENLABS_MODEL_ID` com fallback `eleven_multilingual_v2`

Comportamento:

- chamar endpoint streaming de text-to-speech;
- devolver áudio como `audio/mpeg`;
- retornar `503` se a integração não estiver configurada.

### STT

Rota: `POST /api/stt/transcribe`

Entrada esperada:

- corpo binário `audio/webm`;

Variáveis:

- `STT_API_KEY`

Comportamento:

- usar Deepgram como STT inicial;
- idioma `pt-BR`;
- retornar `{ "text": "..." }`;
- retornar `503` se a integração não estiver configurada.

### Webhooks n8n/Make

Rota: `POST /api/webhooks/automation`

Variável:

- `BRASA_AUTOMATION_WEBHOOK_URL`

Comportamento:

- se a variável estiver presente, repassar o payload;
- se ausente, responder `{ "ok": true, "skipped": true }`;
- não bloquear a conversa do Brasa por falha de webhook.

## Frontend

Manter a UI atual, IndexedDB, Zustand, orbe 3D e grafo neural. Ajustes necessários:

- continuar usando rotas relativas `/api/...`;
- tratar `503` das integrações como mensagem operacional clara;
- manter proteção contra loop de áudio: escuta desligada enquanto TTS fala;
- manter fallback local somente quando a API estiver indisponível, sem esconder erros no console;
- expor status de integração no console visual futuramente, mas não nesta entrega.

## Deploy Na Hostinger

Configuração alvo:

- Node.js: `22.x`;
- package manager: `npm`;
- build command: `npm install && npm run build`;
- start command: `npm start`;
- app root: raiz do projeto;
- domínio: `brasa.leonardobrasil.com.br`;
- variáveis de ambiente configuradas no hPanel, nunca no GitHub ou no código.

Scripts esperados:

```json
{
  "build": "vite build",
  "typecheck": "tsc --noEmit",
  "start": "node server/index.mjs",
  "dev": "vite",
  "dev:server": "node server/index.mjs",
  "test": "vitest run"
}
```

## Segurança

- Não usar variáveis `VITE_*` para segredos em produção.
- Não commitar `.env.local`.
- Não colocar senha FTP em GitHub.
- Não retornar respostas brutas completas de APIs externas em produção quando contiverem metadados sensíveis.
- Health check só indica booleanos de configuração, não valores.

## Testes E Verificação

Adicionar testes unitários para helpers do backend:

- sanitização de mensagens Claude;
- leitura de status de ambiente;
- construção de respostas de erro;
- roteamento mínimo do health check, se a estrutura permitir testar sem subir porta real.

Verificações obrigatórias antes de publicar:

```bash
npm test
npm run build
npm start
```

E chamadas manuais/automatizadas:

```bash
GET /api/health
POST /api/anthropic/messages
POST /api/elevenlabs/tts
POST /api/stt/transcribe
```

## Fora Do Escopo Desta Versão

- Persistência server-side do Second Brain;
- autenticação de usuário;
- painel administrativo;
- instalação de skills especializadas;
- integração Obsidian/JSON Canvas;
- otimização profunda de bundle/code splitting;
- streaming incremental de fala no frontend.

Esses itens devem ser planejados depois que o backend seguro estiver rodando em produção.
