import { Points, Square, User } from 'src/types';

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
      {isGameBoard && points && (
        <h2 className="mb-2 text-center text-2xl font-medium uppercase text-zinc-300">
          <span>
            {owner}: <span className="font-bold text-white">{points[owner]}</span>
          </span>
        </h2>
      )}

      <div className="grid w-fit grid-rows-[repeat(10,_35px)] border border-solid border-gray-400 lg:grid-rows-[repeat(10,_40px)]">
        {squares.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-[repeat(10,_35px)] lg:grid-cols-[repeat(10,_40px)]"
          >
            {row.map((square, colIndex) => {
              const squareStyles = {
                empty: 'bg-empty',
                ship: 'bg-ship',
                hit: 'bg-hit',
                miss: 'bg-miss',
              };

              return (
                <div
                  onClick={onClick ? () => onClick(rowIndex, colIndex) : undefined}
                  className={`cursor-pointer border border-gray-400 ${
                    owner === 'player'
                      ? squareStyles[square]
                      : square === 'ship'
                      ? ''
                      : squareStyles[square]
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
