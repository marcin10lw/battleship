import { useState } from 'react';

import Board from '../Board';
import SelectShip from '../SelectShip';
import { Ship, Square } from '../../types';
import { BOARD_HEIGHT, BOARD_WIDTH } from '../../utils/constants';

type SelectShipsProps = {
  playerBoard: Square[][];
  remainingPlayerShips: Ship[];
  canStartGame: boolean;
  setPlayerBoard: React.Dispatch<React.SetStateAction<Square[][]>>;
  setRemainingPlayerShips: React.Dispatch<React.SetStateAction<Ship[]>>;
  startGame: () => void;
};

const SelectShips = ({
  playerBoard,
  remainingPlayerShips,
  canStartGame,
  setPlayerBoard,
  setRemainingPlayerShips,
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
        for (let i = 0; i < selectedShip.length; i++) {
          newBoard[row][col + i] = 'ship';
        }
        setPlayerBoard(newBoard);
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
        for (let i = 0; i < selectedShip.length; i++) {
          newBoard[row + i][col] = 'ship';
        }
        setPlayerBoard(newBoard);
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
