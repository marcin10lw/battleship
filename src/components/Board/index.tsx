import { useState } from 'react';

import './style.css';

const Board = () => {
  const [grid, setGrid] = useState<string[][]>([]);
  const rows = 10;
  const columns = 10;

  if (grid.length === 0) {
    const newGrid: string[][] = [];
    for (let i = 0; i < rows; i++) {
      const newRow: string[] = [];
      for (let j = 0; j < columns; j++) {
        newRow.push('empty');
      }

      newGrid.push(newRow);
    }

    setGrid(newGrid);
  }

  const handleClick = (row: number, col: number) => {
    const cell = grid[row][col];

    if (cell === 'empty') {
      const newGrid = [...grid];
      newGrid[row][col] = 'ship';
      setGrid(newGrid);
    } else if (cell === 'ship') {
      const newGrid = [...grid];
      newGrid[row][col] = 'hit';
      setGrid(newGrid);
    } else if (cell === 'hit' || cell === 'miss') {
      console.log('You already shot here');
    }
  };

  return (
    <section className="board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="board__row">
          {row.map((cell, colIndex) => (
            <div
              onClick={() => handleClick(rowIndex, colIndex)}
              className={`cell ${cell}`}
              key={colIndex}
            ></div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Board;
