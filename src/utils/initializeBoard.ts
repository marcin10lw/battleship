import { Square } from 'src/types';
import { BOARD_HEIGHT, BOARD_WIDTH, SHIPS } from './constants';

export const initializeBoard = () => {
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

export const createComputerBoard = () => {
  const newComputerBoard: Square[][] = initializeBoard();

  for (const ship of SHIPS) {
    let isValidPlacement = false;

    while (!isValidPlacement) {
      const isVertical = Math.random() < 0.5;
      const randomRowStartIndex = Math.floor(Math.random() * BOARD_HEIGHT);
      const randomColStartIndex = Math.floor(Math.random() * BOARD_WIDTH);

      if (
        (isVertical && randomRowStartIndex + ship.length <= BOARD_HEIGHT) ||
        (!isVertical && randomColStartIndex + ship.length <= BOARD_WIDTH)
      ) {
        isValidPlacement = true;

        for (let i = 0; i < ship.length; i++) {
          if (
            (isVertical &&
              newComputerBoard[randomRowStartIndex + i][randomColStartIndex] !== 'empty') ||
            (!isVertical &&
              newComputerBoard[randomRowStartIndex][randomColStartIndex + i] !== 'empty')
          ) {
            isValidPlacement = false;
            break;
          }
        }

        if (isValidPlacement) {
          for (let i = 0; i < ship.length; i++) {
            if (isVertical) {
              newComputerBoard[randomRowStartIndex + i][randomColStartIndex] = 'ship';
            } else {
              newComputerBoard[randomRowStartIndex][randomColStartIndex + i] = 'ship';
            }
          }
        }
      }
    }
  }

  return newComputerBoard as Square[][];
};
