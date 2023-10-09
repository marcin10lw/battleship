import { Ship } from '../types';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 10;

export const SHIPS: Ship[] = [
  {
    name: 'destroyer',
    length: 2,
  },
  {
    name: 'submarine',
    length: 3,
  },
  {
    name: 'cruiser',
    length: 3,
  },
  {
    name: 'battleship',
    length: 4,
  },
  {
    name: 'carrier',
    length: 5,
  },
];
