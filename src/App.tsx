import { useEffect, useState } from 'react';

import { createComputerBoard, initializeBoard } from './utils/initializeBoard';
import { Ship, Square } from './types';
import SelectShips from './views/SelectShips';
import { BOARD_HEIGHT, BOARD_WIDTH, SHIPS } from './utils/constants';
import Board from './components/Board';

function App() {
  const [remainingPlayerShips, setRemainingPlayerShips] = useState<Ship[]>(SHIPS);
  const [playerBoard, setPlayerBoard] = useState<Square[][]>(initializeBoard());
  const [computerBoard, setComputerBoard] = useState<Square[][]>(createComputerBoard());
  const [gameStarted, setGameStarted] = useState(false);
  const [turn, setTurn] = useState<'player' | 'computer'>('player');

  console.log(playerBoard);

  const canStartGame = remainingPlayerShips.length === 0;

  const startGame = () => {
    if (!canStartGame) {
      return;
    }

    setGameStarted(true);
  };

  const onComputerAttack = () => {
    if (gameStarted && turn === 'computer') {
      const randomRowIndex = Math.floor(Math.random() * BOARD_HEIGHT);
      const randomColIndex = Math.floor(Math.random() * BOARD_WIDTH);
      const newPlayerBoard = [...playerBoard];

      if (playerBoard[randomRowIndex][randomColIndex] === 'empty') {
        newPlayerBoard[randomRowIndex][randomColIndex] = 'miss';
        setTurn('player');
      } else if (playerBoard[randomRowIndex][randomColIndex] === 'ship') {
        newPlayerBoard[randomRowIndex][randomColIndex] = 'hit';
        setTurn('player');
      } else {
        setTurn('player');
        return;
      }

      setPlayerBoard(newPlayerBoard);
    }
  };

  const onPlayerAttack = (row: number, col: number) => {
    const newComputerBoard = [...computerBoard];

    if (gameStarted && turn === 'player') {
      if (computerBoard[row][col] === 'empty') {
        newComputerBoard[row][col] = 'miss';
      } else if (computerBoard[row][col] === 'ship') {
        newComputerBoard[row][col] = 'hit';
      } else {
        return;
      }

      setTurn('computer');
      setComputerBoard(newComputerBoard);
    }
  };

  useEffect(() => {
    if (gameStarted && turn === 'computer') {
      const timerId = setTimeout(() => {
        onComputerAttack();
      }, 200);

      return () => clearTimeout(timerId);
    }
  }, [gameStarted, turn]);

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
