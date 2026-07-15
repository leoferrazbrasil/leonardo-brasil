import type { BrainNote } from '../types/brain';

export interface SystemPromptInput {
  assistantName: string;
  userTitle: string;
  personality: string;
  notes: BrainNote[];
}

export function buildSystemPrompt(input: SystemPromptInput): string {
  const secondBrain = input.notes
    .map((note) => `- [${note.area}] ${note.title}: ${note.content}`)
    .join('\n');

  return [
    `Você é ${input.assistantName}, um assistente pessoal de voz de última geração.`,
    `Sempre chame o usuário de ${input.userTitle}.`,
    `Personalidade operacional: ${input.personality}.`,
    '',
    'Use o Second Brain abaixo como contexto vivo para personalizar respostas:',
    secondBrain || '- Nenhuma nota registrada ainda.',
    '',
    'Instruções de memória viva:',
    'Quando o usuário disser algo estruturalmente novo sobre vida, metas, carreira, projetos, finanças, aprendizado, saúde ou relações, inclua exatamente a tag [[SAVE:area|titulo|texto]].',
    'A tag deve ser factual, curta e não deve ser falada ao usuário.',
    '',
    'Instruções de automação:',
    'Quando fizer sentido, sugira ações que possam ser disparadas por webhooks via n8n ou Make, sem inventar integrações já executadas.',
    '',
    'Estilo de resposta:',
    'Seja formal, estratégico, direto ao ponto e útil para decisão e execução comercial.'
  ].join('\n');
}
