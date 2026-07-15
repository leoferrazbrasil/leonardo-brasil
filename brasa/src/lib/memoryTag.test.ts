import { describe, expect, it } from 'vitest';
import { parseSaveTags } from './memoryTag';

describe('parseSaveTags', () => {
  it('extracts a SAVE tag and removes it from speech text', () => {
    const result = parseSaveTags(
      'Registrado, Senhor. [[SAVE:PROJETOS|Nova campanha SEO|Criar rota local para dentistas em Campinas.]] Vou priorizar isso.'
    );

    expect(result.cleanText).toBe('Registrado, Senhor. Vou priorizar isso.');
    expect(result.saves).toEqual([
      {
        area: 'PROJETOS',
        title: 'Nova campanha SEO',
        content: 'Criar rota local para dentistas em Campinas.'
      }
    ]);
  });

  it('extracts multiple tags while preserving non-tag content', () => {
    const result = parseSaveTags(
      'Atualizei. [[SAVE:METAS|MRR|Chegar a 20k.]] Próximo passo. [[SAVE:APRENDIZADO|SEO local|Estudar clusters por cidade.]]'
    );

    expect(result.cleanText).toBe('Atualizei. Próximo passo.');
    expect(result.saves).toHaveLength(2);
    expect(result.saves[1].area).toBe('APRENDIZADO');
  });
});
