import { Points, Square } from 'src/types';
import Board from './Board';
import PlayAgain from './PlayAgain';

type GameProps = {
  points: Points;
  playerBoard: Square[][];
  computerBoard: Square[][];
  playAgain: () => void;
  onPlayerAttack: (row: number, col: number) => void;
};

const Game = ({ points, playerBoard, computerBoard, playAgain, onPlayerAttack }: GameProps) => {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-12 lg:flex-row lg:gap-14 lg:pt-20">
      <Board points={points} squares={playerBoard} owner="player" isGameBoard />
      <div className="w-12">
        <PlayAgain onClick={playAgain} />
      </div>
      <Board
        points={points}
        squares={computerBoard}
        owner="computer"
        onClick={onPlayerAttack}
        isGameBoard
      />
    </section>
  );
};

export default Game;
