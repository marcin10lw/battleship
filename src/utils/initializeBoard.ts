import { Square } from '../types';
import { BOARD_HEIGHT, BOARD_WIDTH } from './constants';

const initializeBoard = () => {
  const board = [];
  for (let i = 0; i < BOARD_HEIGHT; i++) {
    const row = [];
    for (let j = 0; j < BOARD_WIDTH; j++) {
      row.push('empty');
    }

    board.push(row);
  }

  return board as Square[][];
};

export default initializeBoard;
