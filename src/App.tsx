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
          remainingPlayerShips={remainingPlayerShips}
          setPlayerBoard={setPlayerBoard}
          setRemainingPlayerShips={setRemainingPlayerShips}
          startGame={startGame}
        />
      )}
    </div>
  );
}

export default App;
