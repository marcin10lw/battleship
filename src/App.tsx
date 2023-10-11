import SelectShips from './components/SelectShips';
import Board from './components/Board';
import useBattleship from './hooks/useBattleship';

function App() {
  const {
    canStartGame,
    computerBoard,
    gameStarted,
    playerBoard,
    remainingPlayerShips,
    setPlayerBoard,
    onPlayerAttack,
    setRemainingPlayerShips,
    startGame,
  } = useBattleship();

  return (
    <main className="mx-auto min-h-screen max-w-6xl pt-12">
      <h1 className="text-center lg:text-5xl">Battleship!</h1>
      {gameStarted ? (
        <div>
          <Board squares={playerBoard} owner="player" />
          <Board squares={computerBoard} owner="computer" onClick={onPlayerAttack} />
        </div>
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
