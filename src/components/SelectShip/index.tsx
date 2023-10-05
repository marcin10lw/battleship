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
      <h2>Choose your ship</h2>
      <ul className="selectShip__list">
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
