# Deploy Do Brasa Na Hostinger

## Tipo De Aplicativo

Use **Aplicativo Web** com Node.js.

- Node.js: `22.x`
- Package manager: `npm`
- App root: raiz do projeto
- Dominio: `brasa.leonardobrasil.com.br`

## Comandos

Build command:

```bash
npm run build
```

Start command:

```bash
npm start
```

## Variaveis De Ambiente

Configure no hPanel em **Variaveis de ambiente**:

```text
NODE_ENV=production
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
STT_API_KEY=
BRASA_AUTOMATION_WEBHOOK_URL=
```

Nao configure segredos como `VITE_*` em producao. Variaveis `VITE_*` entram no bundle do navegador.

## Rotas De Verificacao

Depois do deploy, acesse:

```text
https://brasa.leonardobrasil.com.br/api/health
```

Resposta esperada:

```json
{
  "ok": true,
  "version": "0.1.0",
  "integrations": {
    "anthropic": true,
    "elevenLabs": true,
    "stt": true,
    "automationWebhook": false
  }
}
```

`automationWebhook` pode ser `false` se n8n/Make ainda nao estiver configurado.

## Seguranca

- Nao coloque senha FTP no GitHub.
- Nao commite `.env.local`.
- Nao exponha chaves como `VITE_*`.
- Use apenas variaveis de ambiente no hPanel para chaves de API.

## Observacao

O app Node serve tanto o frontend compilado em `dist/` quanto as rotas `/api/*`. Nao publique apenas a pasta `dist` se quiser Claude, ElevenLabs e STT funcionando em producao.
