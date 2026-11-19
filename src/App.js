import { useSelector } from 'react-redux';

import Controls from './Controls.js';
import Canvas from './Canvas.js';
import SaveAndLoad from './SaveAndLoad.js';

import './App.css';

function App() {
  const showSaveAndLoad = useSelector(({ toolSelected }) => toolSelected.showSaveAndLoad);

  return (
    <div className="App">
      <Controls />
      <Canvas />
      {showSaveAndLoad && <SaveAndLoad />}
    </div>
  );
}

export default App;
