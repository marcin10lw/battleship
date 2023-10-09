import { useState } from 'react';
import Board from './components/Board';
import SelectShip from './components/SelectShip';
import { Ship, Square } from './types';

const ships: Ship[] = [
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

function App() {
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [remainingShips, setRemainingShips] = useState<Ship[]>(ships);
  const [board, setBoard] = useState<Square[][]>([]);

  const selectShip = (ship: Ship) => {
    setSelectedShip(ship);
  };

  const handleSquareClick = (row: number, col: number) => {
    if (selectedShip) {
      if (row + selectedShip.length > board.length || col + selectedShip.length > board[0].length) {
        alert('can not place ship there');
      }

      for (let i = 0; i < selectedShip.length; i++) {
        if (board[row + i][col] !== 'empty') {
          alert('Ship placement is invalid. Squares are occupied.');
          return;
        }
      }

      const updatedBoard = [...board];

      for (let i = 0; i < selectedShip.length; i++) {
        updatedBoard[row + i][col] = 'ship';
      }

      setBoard(updatedBoard);
    }
  };

  return (
    <div className="app">
      <h1>Battleship!</h1>
      <SelectShip
        remainingShips={remainingShips}
        selectedShip={selectedShip}
        selectShip={selectShip}
      />
      <Board onClick={handleSquareClick} squares={board} />

      <button>Start Game</button>
    </div>
  );
}

export default App;
