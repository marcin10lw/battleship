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

  return (
    <div className="app">
      <h1>Battleship!</h1>
      {gameStarted ? (
        <div>
          <Board squares={playerBoard} />
          <Board squares={computerBoard} />
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
