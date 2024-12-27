export interface Card {
  id: string;
  type: 'unit' | 'value';
  content: string;
  matched: boolean;
  flipped: boolean;
}

export interface MatchPair {
  unit: string;
  value: string;
}