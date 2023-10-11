import { Points, Square, User } from '../../types';

type BoardProps = {
  squares: Square[][];
  owner: User;
  points?: Points;
  isGameBoard?: boolean;
  onClick?: (row: number, col: number) => void;
};

const Board = ({ squares, onClick, owner, isGameBoard, points }: BoardProps) => {
  return (
    <div>
      <h2 className="mb-1 text-center text-2xl font-medium uppercase text-zinc-700">
        {isGameBoard && points && `${owner}: ${points[owner]}`}
      </h2>

      <div className="grid grid-rows-[repeat(10,_35px)] border border-solid border-gray-500 lg:grid-rows-[repeat(10,_40px)]">
        {squares.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-[repeat(10,_35px)] lg:grid-cols-[repeat(10,_40px)]"
          >
            {row.map((square, colIndex) => {
              let squareStyle: `bg-${Square}`;

              switch (square) {
                case 'empty':
                  squareStyle = 'bg-empty';
                  break;
                case 'ship':
                  squareStyle = 'bg-ship';
                  break;
                case 'hit':
                  squareStyle = 'bg-hit';
                  break;
                case 'miss':
                  squareStyle = 'bg-miss';
              }

              return (
                <div
                  onClick={onClick ? () => onClick(rowIndex, colIndex) : undefined}
                  className={`cursor-pointer border border-gray-500 ${
                    owner === 'player' ? squareStyle : square === 'ship' ? '' : squareStyle
                  }`}
                  key={colIndex}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
