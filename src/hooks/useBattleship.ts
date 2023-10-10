import { useEffect, useState } from 'react';

import { createComputerBoard, initializeBoard } from '../utils/initializeBoard';
import createSquaresLeft from '../utils/createSquaresLeft';
import { Ship, Square, User } from '../types';
import { BOARD_HEIGHT, BOARD_WIDTH, SHIPS } from '../utils/constants';

const useBattleship = () => {
  const [remainingPlayerShips, setRemainingPlayerShips] = useState<Ship[]>(SHIPS);

  const [playerBoard, setPlayerBoard] = useState<Square[][]>(initializeBoard());
  const [computerBoard, setComputerBoard] = useState<Square[][]>(createComputerBoard());

  const [gameStarted, setGameStarted] = useState(false);
  const [turn, setTurn] = useState<User>('player');
  const [winner, setWinner] = useState<'player' | 'computer' | null>(null);

  const playerSquaresLeft = createSquaresLeft(playerBoard);
  const computerSquaresLeft = createSquaresLeft(computerBoard);

  const canStartGame = remainingPlayerShips.length === 0;
  const startGame = () => {
    if (!canStartGame) {
      return;
    }

    setGameStarted(true);
  };

  const onComputerAttack = () => {
    if (gameStarted && turn === 'computer' && !winner) {
      let randomRow: number, randomCol: number;
      do {
        randomRow = Math.floor(Math.random() * BOARD_HEIGHT);
        randomCol = Math.floor(Math.random() * BOARD_WIDTH);
      } while (
        playerBoard[randomRow][randomCol] === 'miss' ||
        playerBoard[randomRow][randomCol] === 'hit'
      );

      if (playerBoard[randomRow][randomCol] === 'ship') {
        const newPlayerBoard = [...playerBoard];
        newPlayerBoard[randomRow][randomCol] = 'hit';
        setPlayerBoard(newPlayerBoard);

        setTurn('player');
      } else {
        const newPlayerBoard = [...playerBoard];
        newPlayerBoard[randomRow][randomCol] = 'miss';
        setPlayerBoard(newPlayerBoard);

        setTurn('player');
      }
    }
  };

  const onPlayerAttack = (row: number, col: number) => {
    if (gameStarted && turn === 'player' && !winner) {
      const newComputerBoard = [...computerBoard];

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
    if (gameStarted && turn === 'computer' && !winner) {
      const timerId = setTimeout(() => {
        onComputerAttack();
      }, 200);

      return () => clearTimeout(timerId);
    }
  }, [gameStarted, turn, winner]);

  useEffect(() => {
    if (gameStarted && !winner) {
      if (playerSquaresLeft.length === 0) {
        setWinner('computer');
      } else if (computerSquaresLeft.length === 0) {
        setWinner('player');
      }
    }
  }, [playerSquaresLeft, computerSquaresLeft, gameStarted, winner]);

  return {
    gameStarted,
    playerBoard,
    computerBoard,
    canStartGame,
    setPlayerBoard,
    remainingPlayerShips,
    startGame,
    onPlayerAttack,
    setRemainingPlayerShips,
  };
};

export default useBattleship;
