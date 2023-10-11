import { Ship } from '../../types';
import './style.css';

type SelectShipProps = {
  remainingShips: Ship[];
  selectedShip: Ship | null;
  selectShip: (ship: Ship) => void;
};

const SelectShip = ({ remainingShips, selectedShip, selectShip }: SelectShipProps) => {
  return (
    <div className="selectShip">
      <h2 className="text-2xl">Place your ships</h2>
      <ul className="mt-2 flex flex-col gap-2">
        {remainingShips.map((ship) => {
          const isActive = selectedShip === ship;

          return (
            <li key={ship.name}>
              <button className={`${isActive ? 'active' : ''}`} onClick={() => selectShip(ship)}>
                Size: {ship.length}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectShip;
