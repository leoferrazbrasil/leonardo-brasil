import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NeuralGraph } from './NeuralGraph';
import type { BrainNote } from '../types/brain';

const storeState = {
  notes: [] as BrainNote[],
  setSelectedNote: vi.fn(),
  memoryPulse: 0
};

vi.mock('../store/assistantStore', () => ({
  useAssistantStore: vi.fn((selector: (state: typeof storeState) => unknown) => selector(storeState))
}));

describe('NeuralGraph', () => {
  beforeEach(() => {
    storeState.notes = [
      {
        id: 'meta-mensal',
        title: 'Meta mensal',
        area: 'METAS',
        content: 'Faturar R$10.000 por mes.',
        createdAt: '2026-07-16T10:00:00.000Z',
        updatedAt: '2026-07-16T10:00:00.000Z'
      }
    ];
    storeState.memoryPulse = 0;
    storeState.setSelectedNote.mockClear();
  });

  it('renders memory nodes as local interactive SVG elements', () => {
    render(<NeuralGraph />);

    const noteNode = screen.getByRole('button', { name: 'Meta mensal' });

    fireEvent.click(noteNode);

    expect(storeState.setSelectedNote).toHaveBeenCalledWith(storeState.notes[0]);
  });
});
