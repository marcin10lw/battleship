import { Square } from '../../types';
import './style.css';

type BoardProps = {
  squares: Square[][];
  onClick: (row: number, col: number) => void;
};

const Board = ({ squares, onClick }: BoardProps) => {
  return (
    <section>
      <div className="board">
        {squares.map((row, rowIndex) => (
          <div key={rowIndex} className="board__row">
            {row.map((square, colIndex) => (
              <div
                onClick={() => onClick(rowIndex, colIndex)}
                className={`square ${square}`}
                key={colIndex}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Board;
