import { useState } from 'react';
import { toast } from 'sonner';

import Board from '../Board';
import SelectShip from '../SelectShip';
import { Ship, Square } from 'src/types';
import { BOARD_HEIGHT, BOARD_WIDTH } from 'src/utils/constants';

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

  const showPlacementError = () => toast.error('Can not place ship there');

  const handlePlayerShipsPlacement = (row: number, col: number) => {
    if (selectedShip) {
      if (orientation === 'horizontal') {
        if (col > BOARD_WIDTH - selectedShip.length) {
          showPlacementError();
          return;
        }

        for (let i = 0; i < selectedShip.length; i++) {
          if (playerBoard[row][col + i] !== 'empty') {
            showPlacementError();
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
          showPlacementError();
          return;
        }

        for (let i = 0; i < selectedShip.length; i++) {
          if (playerBoard[row + i][col] !== 'empty') {
            showPlacementError();
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
      toast.message('You must select ship first');
    }
  };

  return (
    <section className="mx-auto max-w-[400px] py-12 lg:max-w-3xl lg:py-20">
      <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-start lg:gap-16">
        <div>
          <SelectShip
            remainingShips={remainingPlayerShips}
            selectedShip={selectedShip}
            selectShip={selectShip}
          />
          {!canStartGame && (
            <button
              className="mx-auto mt-7 block rounded bg-rose-900 px-2 py-1 font-medium text-white lg:mx-0 lg:mt-10"
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
          )}
        </div>
        <Board onClick={handlePlayerShipsPlacement} squares={playerBoard} owner="player" />
      </div>

      <button
        onClick={startGame}
        disabled={!canStartGame}
        className="mt-10 block w-full cursor-pointer rounded-lg border-2 border-rose-700 py-2 text-xl font-medium transition-colors duration-200 hover:bg-rose-700 hover:text-white disabled:pointer-events-none disabled:opacity-50"
      >
        Start Game
      </button>
    </section>
  );
};
export default SelectShips;
