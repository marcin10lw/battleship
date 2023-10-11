export type Ship = {
  name: string;
  length: number;
};

export type Square = 'empty' | 'ship' | 'hit' | 'miss';

export type User = 'player' | 'computer';

export type Points = {
  [key in User]: number;
};
