# Brasa Design Spec

## Objetivo

Construir um assistente pessoal de voz chamado Brasa, com interface cinematografica em tela cheia, orbe 3D reativo, Second Brain visual em grafo 3D, memoria persistente no navegador e stubs prontos para Claude, ElevenLabs, STT e automacoes n8n/Make.

## Perfil Configurado

- Nome do assistente: Brasa
- Tratamento do usuario: Senhor
- Wake word: Brasa
- Personalidade: formal, estrategico e direto ao ponto
- Paleta: Roxo Profundo e Coral com enfase em calor

## Arquitetura

- React + Vite + TypeScript para a aplicacao.
- Tailwind CSS e Framer Motion para UI e transicoes.
- Zustand para estado global de sessao, voz, notas e selecao do grafo.
- Three.js com React Three Fiber, Drei e post-processing Bloom para orbe e ambientacao.
- react-force-graph-3d para o grafo neural 3D.
- Dexie.js para persistir notas do Second Brain no IndexedDB.
- Vite proxy opcional para chamadas locais sem expor chaves no frontend em ambiente de desenvolvimento.

## Fluxos Principais

1. Boot visual em tela cheia com botao ATIVAR SISTEMA.
2. Ativacao solicita microfone, altera estado do orbe e emite saudacao por ElevenLabs quando configurado.
3. Usuario pode interagir por texto ou voz.
4. Prompt do Claude recebe personalidade, Second Brain e regra de memoria viva.
5. Resposta do Claude e limpa antes do TTS; tags `[[SAVE:area|titulo|texto]]` sao interceptadas, persistidas e refletidas no grafo.
6. Clique em um no do grafo abre modal editavel para atualizar a nota.

## Second Brain Inicial

As notas iniciais representam Leonardo Brasil, funilcomercial.com, metas comerciais, quatro camadas da estrutura de vendas, SEO organico, rotina comercial e ICP de negocios locais.
