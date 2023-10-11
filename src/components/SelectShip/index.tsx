import { Ship } from 'src/types';

type SelectShipProps = {
  remainingShips: Ship[];
  selectedShip: Ship | null;
  selectShip: (ship: Ship) => void;
};

const SelectShip = ({ remainingShips, selectedShip, selectShip }: SelectShipProps) => {
  return (
    <div>
      <h2 className="text-center text-2xl lg:text-start">Place your ships</h2>
      <ul className="mt-6 flex flex-wrap justify-center gap-3 lg:flex-col">
        {remainingShips.map((ship) => {
          const isActive = selectedShip === ship;
          const shipLengthArray = Array.from({ length: ship.length }, (_, index) => index);

          return (
            <li key={ship.name}>
              <button
                className={`flex gap-1 rounded border border-rose-950 p-2  ${
                  isActive ? 'border-green-700 bg-rose-200 opacity-70' : ''
                }`}
                onClick={() => selectShip(ship)}
              >
                {shipLengthArray.map((shipLength) => (
                  <span key={shipLength} className="block h-4 w-4 bg-rose-400" />
                ))}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectShip;
