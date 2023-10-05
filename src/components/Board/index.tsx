import { useState } from 'react';

import './style.css';
import Ship from '../Ship';
import { Ship as ShipType } from '../../types';

type BoardProps = {
  selectedShip: ShipType | null;
  remainingShips: ShipType[];
  setRemainingShips: React.Dispatch<React.SetStateAction<ShipType[]>>;
  setSelectedShip: React.Dispatch<React.SetStateAction<ShipType | null>>;
};

const Board = ({
  selectedShip,
  remainingShips,
  setRemainingShips,
  setSelectedShip,
}: BoardProps) => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [playerShips, setPlayerShips] = useState<string[][]>([]);
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('horizontal');
  const [validPlacement, setValidPlacement] = useState(true);

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
    if (grid[row][col] === 'empty' && selectedShip?.length && remainingShips.length > 0) {
      const newGrid = [...grid];
      let isValid = true;

      if (orientation === 'horizontal') {
        if (col + selectedShip.length > columns) {
          isValid = false;
        } else {
          for (let i = col; i < col + selectedShip.length; i++) {
            if (newGrid[row][i] === 'ship') {
              isValid = false;
              break;
            }
          }
        }
      } else {
        if (row + selectedShip.length > rows) {
          isValid = false;
        } else {
          for (let i = row; i < row + selectedShip.length; i++) {
            if (newGrid[i][col] === 'ship') {
              isValid = false;
              break;
            }
          }
        }
      }

      if (isValid) {
        if (orientation === 'horizontal') {
          for (let i = col; i < col + selectedShip.length; i++) {
            newGrid[row][i] = 'ship';
          }
        } else {
          for (let i = row; i < row + selectedShip.length; i++) {
            newGrid[i][col] = 'ship';
          }
        }

        const newRemainingShip = remainingShips.filter((ship) => ship.name !== selectedShip.name);
        setRemainingShips(newRemainingShip);
        setSelectedShip(null);
      } else {
        setValidPlacement(false);
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
