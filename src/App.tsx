import { useState } from 'react';

import { createComputerBoard, initializeBoard } from './utils/initializeBoard';
import { Ship, Square } from './types';
import SelectShips from './views/SelectShips';
import { SHIPS } from './utils/constants';
import Board from './components/Board';

function App() {
  const [remainingPlayerShips, setRemainingPlayerShips] = useState<Ship[]>(SHIPS);
  const [playerBoard, setPlayerBoard] = useState<Square[][]>(initializeBoard());
  const [computerBoard, setComputerBoard] = useState<Square[][]>(createComputerBoard());
  const [gameStarted, setGameStarted] = useState(false);
  const [turn, setTurn] = useState<'player' | 'computer'>('player');

  console.log(computerBoard);

  const canStartGame = remainingPlayerShips.length === 0;

  const startGame = () => {
    if (!canStartGame) {
      return;
    }

    setGameStarted(true);
  };

  const onPlayerAttack = (row: number, col: number) => {
    if (gameStarted && turn === 'player') {
      if (computerBoard[row][col] === 'empty') {
        const newComputerBoard = [...computerBoard];
        newComputerBoard[row][col] = 'miss';
        setComputerBoard(newComputerBoard);

        setTurn('computer');
      } else if (computerBoard[row][col] === 'ship') {
        const newComputerBoard = [...computerBoard];
        newComputerBoard[row][col] = 'hit';
        setComputerBoard(newComputerBoard);

        setTurn('computer');
      } else {
        return;
      }
    }
  };

  return (
    <div className="app">
      <h1>Battleship!</h1>
      {gameStarted ? (
        <div>
          <Board squares={playerBoard} owner="player" />
          <Board squares={computerBoard} owner="computer" onClick={onPlayerAttack} />
        </div>
      ) : (
        <SelectShips
          canStartGame={canStartGame}
          playerBoard={playerBoard}
          setPlayerBoard={setPlayerBoard}
          remainingPlayerShips={remainingPlayerShips}
          setRemainingPlayerShips={setRemainingPlayerShips}
          startGame={startGame}
        />
      )}
    </div>
  );
}

export default App;
