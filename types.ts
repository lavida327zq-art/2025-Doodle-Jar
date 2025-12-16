export type StampType = 'rabbit' | 'cat' | 'bear' | 'star' | 'heart';
export type NoteColor = 'bg-yellow-100' | 'bg-blue-100' | 'bg-rose-100' | 'bg-green-100' | 'bg-orange-100';

export interface StarData {
  id: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  delay: number;
  color: string;
}

export interface PinnedNoteData {
  id: string;
  question: string;
  answer: string;
  rotation: number;
  color: NoteColor;
  stamp: StampType;
}