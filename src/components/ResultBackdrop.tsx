import { User } from 'src/types';
import PlayAgain from './PlayAgain';

type ResultBackdropProps = {
  playAgain: () => void;
  winner: User;
};

const ResultBackdrop = ({ winner, playAgain }: ResultBackdropProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[hsl(0deg_0%_0%_/_50%)] px-5">
      <div className="animate-pop aspect-video w-full max-w-md rounded-2xl bg-slate-200 p-8 text-center shadow-2xl">
        <span className="block text-2xl tracking-wider text-slate-950 lg:text-3xl">Winner:</span>
        <span className="mt-2 block text-4xl capitalize tracking-wider text-slate-700 lg:text-5xl">
          {winner}
        </span>
        <div className="mx-auto mt-6 flex w-11 justify-center text-slate-700 lg:mt-8 lg:w-14">
          <PlayAgain onClick={playAgain} />
        </div>
      </div>
    </div>
  );
};

export default ResultBackdrop;
