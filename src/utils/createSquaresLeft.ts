import { Square } from '../types';

const createSquaresLeft = (board: Square[][]) => {
  const newComputerSquares: string[] = [];

  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === 'ship') {
        newComputerSquares.push(`${rowIndex}_${colIndex}`);
      }
    });
  });

  return newComputerSquares;
};

export default createSquaresLeft;
