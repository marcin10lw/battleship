import './style.css';

type SelectShipProps = {
  onSelect: (size: number) => void;
  selectedSize: number;
};

const SelectShip = ({ onSelect, selectedSize }: SelectShipProps) => {
  const shipSizes = [2, 3, 3, 4, 5];

  return (
    <div className="selectShip">
      <h2>Choose your ship</h2>
      <ul className="selectShip__list">
        {shipSizes.map((size, index) => {
          return (
            <li
              key={index}
              className={size === selectedSize ? 'selected' : ''}
              onClick={() => onSelect(size)}
            >
              <button>
                {Array.from({ length: size }, (_, index) => index).map((dot) => (
                  <span key={dot}>.</span>
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
