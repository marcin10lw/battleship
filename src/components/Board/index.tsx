import { Square, User } from '../../types';
import './style.css';

type BoardProps = {
  squares: Square[][];
  owner: User;
  onClick?: (row: number, col: number) => void;
};

const Board = ({ squares, onClick, owner }: BoardProps) => {
  return (
    <section>
      <div className="board">
        {squares.map((row, rowIndex) => (
          <div key={rowIndex} className="board__row">
            {row.map((square, colIndex) => (
              <div
                onClick={onClick ? () => onClick(rowIndex, colIndex) : undefined}
                className={`square ${
                  owner === 'player' ? square : square === 'ship' ? '' : square
                }`}
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
