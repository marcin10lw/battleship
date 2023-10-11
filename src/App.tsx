import useBattleship from './hooks/useBattleship';
import SelectShips from './components/SelectShips';
import Game from './components/Game';

function App() {
  const {
    canStartGame,
    computerBoard,
    gameStarted,
    playerBoard,
    points,
    remainingPlayerShips,
    setPlayerBoard,
    onPlayerAttack,
    setRemainingPlayerShips,
    startGame,
    playAgain,
  } = useBattleship();

  return (
    <main className="mx-auto min-h-screen max-w-6xl pt-12">
      <h1 className="text-center text-4xl lg:text-5xl">Battleship!</h1>
      {gameStarted ? (
        <Game
          onPlayerAttack={onPlayerAttack}
          computerBoard={computerBoard}
          playerBoard={playerBoard}
          playAgain={playAgain}
          points={points}
        />
      ) : (
        <SelectShips
          canStartGame={canStartGame}
          playerBoard={playerBoard}
          remainingPlayerShips={remainingPlayerShips}
          setPlayerBoard={setPlayerBoard}
          setRemainingPlayerShips={setRemainingPlayerShips}
          startGame={startGame}
        />
      )}
    </main>
  );
}

export default App;
