import { describe, expect, it } from 'vitest';
import { buildSystemPrompt } from './systemPrompt';
import type { BrainNote } from '../types/brain';

const notes: BrainNote[] = [
  {
    id: 'meta-10k',
    title: 'Faturar R$10.000 por mês',
    area: 'METAS',
    content: 'Meta de curto prazo com a funilcomercial.com.',
    createdAt: '2026-07-15T00:00:00.000Z',
    updatedAt: '2026-07-15T00:00:00.000Z'
  }
];

describe('buildSystemPrompt', () => {
  it('injects persona, second brain notes, memory protocol and automation hooks', () => {
    const prompt = buildSystemPrompt({
      assistantName: 'Brasa',
      userTitle: 'Senhor',
      personality: 'formal, estratégico e direto ao ponto',
      notes
    });

    expect(prompt).toContain('Você é Brasa');
    expect(prompt).toContain('chame o usuário de Senhor');
    expect(prompt).toContain('formal, estratégico e direto ao ponto');
    expect(prompt).toContain('[METAS] Faturar R$10.000 por mês');
    expect(prompt).toContain('[[SAVE:area|titulo|texto]]');
    expect(prompt).toContain('n8n');
    expect(prompt).toContain('Make');
  });
});
