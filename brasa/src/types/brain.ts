export type BrainArea =
  | 'VOCÊ'
  | 'METAS'
  | 'CARREIRA'
  | 'PROJETOS'
  | 'FINANÇAS'
  | 'APRENDIZADO'
  | 'SAÚDE'
  | 'RELAÇÕES';

export type AssistantStatus = 'boot' | 'idle' | 'listening' | 'thinking' | 'speaking';

export interface BrainNote {
  id: string;
  title: string;
  area: BrainArea;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface SaveTagPayload {
  area: BrainArea;
  title: string;
  content: string;
}

export interface BrainGraphNode {
  id: string;
  label: string;
  area: BrainArea;
  kind: 'area' | 'note';
  color: string;
  note?: BrainNote;
  val: number;
}

export interface BrainGraphLink {
  source: string;
  target: string;
  strength: number;
}

export interface BrainGraph {
  nodes: BrainGraphNode[];
  links: BrainGraphLink[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
}
