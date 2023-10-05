import { useState } from 'react';
import Board from './components/Board';
import SelectShip from './components/SelectShip';
import { Ship } from './types';

const ships: Ship[] = [
  {
    name: 'destroyer',
    length: 2,
  },
  {
    name: 'submarine',
    length: 3,
  },
  {
    name: 'cruiser',
    length: 3,
  },
  {
    name: 'battleship',
    length: 4,
  },
  {
    name: 'carrier',
    length: 5,
  },
];

function App() {
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [remainingShips, setRemainingShips] = useState<Ship[]>(ships);

  const selectShip = (ship: Ship) => {
    setSelectedShip(ship);
  };

  return (
    <div className="app">
      <h1>Battleship!</h1>
      <SelectShip
        remainingShips={remainingShips}
        selectedShip={selectedShip}
        selectShip={selectShip}
      />
      <Board
        remainingShips={remainingShips}
        selectedShip={selectedShip}
        setRemainingShips={setRemainingShips}
        setSelectedShip={setSelectedShip}
      />
    </div>
  );
}

export default App;
