import { useState } from 'react';

import './style.css';
import Ship from '../Ship';

type BoardProps = {
  shipSize: number;
};

const Board = ({ shipSize }: BoardProps) => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [playerShips, setPlayerShips] = useState<string[][]>([]);
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('horizontal');

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
    if (grid[row][col] === 'empty' && shipSize) {
      const newGrid = [...grid];

      if (orientation === 'horizontal') {
        for (let i = col; i < col + shipSize; i++) {
          newGrid[row][i] = 'ship';
        }
      } else {
        for (let i = row; i < row + shipSize; i++) {
          newGrid[i][col] = 'ship';
        }
      }

      setGrid(newGrid);
    }
  };

  return (
    <section>
      <div className="board">
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
      </div>

      <div>
        <h2>Ship orientation</h2>
        <button
          onClick={() => {
            setOrientation((orientation) => {
              if (orientation === 'horizontal') {
                return 'vertical';
              }

              return 'horizontal';
            });
          }}
        >
          {orientation}
        </button>
      </div>
    </section>
  );
};

export default Board;
