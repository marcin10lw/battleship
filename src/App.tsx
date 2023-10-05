import { useState } from 'react';
import Board from './components/Board';
import SelectShip from './components/SelectShip';

function App() {
  const [selectedShipSize, setSelectedShipSize] = useState<number>(2);

  console.log(selectedShipSize);

  const selectShipSize = (size: number) => {
    setSelectedShipSize(size);
  };

  return (
    <div className="app">
      <h1>Battleship!</h1>
      <SelectShip selectedSize={selectedShipSize} onSelect={selectShipSize} />
      <Board shipSize={selectedShipSize} />
    </div>
  );
}

export default App;
