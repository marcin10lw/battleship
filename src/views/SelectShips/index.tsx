import { useState } from 'react';

import Board from '../../components/Board';
import SelectShip from '../../components/SelectShip';
import { Ship, Square } from '../../types';
import { BOARD_HEIGHT, BOARD_WIDTH, SHIPS } from '../../utils/constants';

type SelectShipsProps = {
  playerBoard: Square[][];
  setPlayerBoard: React.Dispatch<React.SetStateAction<Square[][]>>;
};

const SelectShips = ({ playerBoard, setPlayerBoard }: SelectShipsProps) => {
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [remainingShips, setRemainingShips] = useState<Ship[]>(SHIPS);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');

  const onPlayerShipPlacementSuccess = () => {
    setSelectedShip(null);
    setRemainingShips(remainingShips.filter((ship) => ship.name !== selectedShip?.name));
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
        remainingShips={remainingShips}
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
      <Board onClick={handlePlayerShipsPlacement} squares={playerBoard} />

      <button>Start Game</button>
    </div>
  );
};
export default SelectShips;
