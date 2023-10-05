import { useState } from 'react';

import './style.css';
import Ship from '../Ship';

const Board = () => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [playerShips, setPlayerShips] = useState<string[][]>([]);

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
    setPlayerShips(newGrid.map((row) => [...row]));
  }

  const handleClick = (row: number, col: number) => {
    if (playerShips[row][col] === 'empty') {
      const newPlayerShips = [...playerShips];
      newPlayerShips[row][col] = 'ship';
      setPlayerShips(newPlayerShips);
    } else if (playerShips[row][col] === 'ship') {
      const newPlayerShips = [...playerShips];
      newPlayerShips[row][col] = 'empty';
      setPlayerShips(newPlayerShips);
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
            >
              {playerShips[rowIndex][colIndex] === 'ship' && (
                <Ship size={1} orientation="horizontal" />
              )}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Board;
