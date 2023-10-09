import { useState } from 'react';

import initializeBoard from './utils/initializeBoard';
import { Square } from './types';
import SelectShips from './views/SelectShips';

function App() {
  const [playerBoard, setPlayerBoard] = useState<Square[][]>(initializeBoard());

  return (
    <div className="app">
      <h1>Battleship!</h1>
      <SelectShips playerBoard={playerBoard} setPlayerBoard={setPlayerBoard} />
    </div>
  );
}

export default App;
