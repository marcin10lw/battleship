import { TfiReload } from 'react-icons/tfi';

type PlayAgainProps = {
  onClick: () => void;
};

const PlayAgain = ({ onClick }: PlayAgainProps) => {
  return (
    <button
      onClick={onClick}
      className={`block w-full  transition-transform duration-300 hover:-rotate-45`}
    >
      <TfiReload />
    </button>
  );
};

export default PlayAgain;
