import { useState } from 'react';

import Board from '../../components/Board';
import SelectShip from '../../components/SelectShip';
import { Ship, Square } from '../../types';
import { BOARD_HEIGHT, BOARD_WIDTH } from '../../utils/constants';

type SelectShipsProps = {
  playerBoard: Square[][];
  remainingPlayerShips: Ship[];
  canStartGame: boolean;
  setPlayerBoard: React.Dispatch<React.SetStateAction<Square[][]>>;
  setRemainingPlayerShips: React.Dispatch<React.SetStateAction<Ship[]>>;
  setPlayerSquares: React.Dispatch<React.SetStateAction<never[]>>;
  startGame: () => void;
};

const SelectShips = ({
  playerBoard,
  remainingPlayerShips,
  canStartGame,
  setPlayerBoard,
  setRemainingPlayerShips,
  setPlayerSquares,
  startGame,
}: SelectShipsProps) => {
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');

  const onPlayerShipPlacementSuccess = () => {
    setSelectedShip(null);
    setRemainingPlayerShips(
      remainingPlayerShips.filter((ship) => ship.name !== selectedShip?.name),
    );
    setOrientation('horizontal');
  };

  const selectShip = (ship: Ship) => {
    setSelectedShip(ship);
  };

  const handlePlayerShipsPlacement = (row: number, col: number) => {
    if (selectedShip) {
      if (orientation === 'horizontal') {
        if (col > BOARD_WIDTH - selectedShip.length) {
          alert('Can not place ship there');
          return;
        }

        for (let i = 0; i < selectedShip.length; i++) {
          if (playerBoard[row][col + i] !== 'empty') {
            alert('Can not place ship there');
            return;
          }
        }

        const newBoard = [...playerBoard];
        const newPlayerSquares = [];
        for (let i = 0; i < selectedShip.length; i++) {
          newBoard[row][col + i] = 'ship';
          newPlayerSquares.push(`${row}_${col + i}`);
        }
        setPlayerBoard(newBoard);
        setPlayerSquares((playerSquares) => [...playerSquares, ...newPlayerSquares]);
        onPlayerShipPlacementSuccess();
      } else if (orientation === 'vertical') {
        if (row > BOARD_HEIGHT - selectedShip.length) {
          alert('Can not place ship there');
          return;
        }

        for (let i = 0; i < selectedShip.length; i++) {
          if (playerBoard[row + i][col] !== 'empty') {
            alert('Can not place ship there');
            return;
          }
        }

        const newBoard = [...playerBoard];
        const newPlayerSquares = [];
        for (let i = 0; i < selectedShip.length; i++) {
          newBoard[row + i][col] = 'ship';
          newPlayerSquares.push(`${row + i}_${col}`);
        }
        setPlayerBoard(newBoard);
        setPlayerSquares((playerSquares) => [...playerSquares, ...newPlayerSquares]);
        onPlayerShipPlacementSuccess();
      }
    } else {
      alert('You must select ship first');
    }
  };

  return (
    <div>
      <SelectShip
        remainingShips={remainingPlayerShips}
        selectedShip={selectedShip}
        selectShip={selectShip}
      />
      <button
        onClick={() =>
          setOrientation((orientation) => {
            if (orientation === 'horizontal') {
              return 'vertical';
            }

            return 'horizontal';
          })
        }
      >
        {orientation === 'horizontal' ? 'horizontal' : 'vertical'}
      </button>
      <Board onClick={handlePlayerShipsPlacement} squares={playerBoard} owner="player" />

      <button onClick={startGame} disabled={!canStartGame}>
        Start Game
      </button>
    </div>
  );
};
export default SelectShips;
