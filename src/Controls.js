import { legacy_connect as connect } from 'react-redux'

import { changeTool, TOOLS } from './toolSelected';
import Palette from './Palette.js';

import './Controls.css';

function Controls({ toolSelected, changeTool }) {
  return (
    <div className="Controls">
      <p>{toolSelected.mousePos.x} - {toolSelected.mousePos.y}</p>
      <div className="buttons">
        <button onClick={() => changeTool(TOOLS.selection)} style={{ backgroundColor: toolSelected.current === TOOLS.selection ? 'white' : 'grey' }} title="Selection">+</button>
        <button onClick={() => changeTool(TOOLS.line)} style={{ backgroundColor: toolSelected.current === TOOLS.line ? 'white' : 'grey' }} title="Line">/</button>
        <button onClick={() => changeTool(TOOLS.square)} style={{ backgroundColor: toolSelected.current === TOOLS.square ? 'white' : 'grey' }} title="Square">□</button>
        <button onClick={() => changeTool(TOOLS.filledSquare)} style={{ backgroundColor: toolSelected.current === TOOLS.filledSquare ? 'white' : 'grey' }} title="Filled Square">■</button>
        <button onClick={() => changeTool(TOOLS.circle)} style={{ backgroundColor: toolSelected.current === TOOLS.circle ? 'white' : 'grey' }} title="Circle">○</button>
        <button onClick={() => changeTool(TOOLS.filledCircle)} style={{ backgroundColor: toolSelected.current === TOOLS.filledCircle ? 'white' : 'grey' }} title="Filled Circle">●</button>
      </div>
      <fieldset><legend>Line Width</legend>
        <input type="range" min="0" max="10" />
      </fieldset>
      <fieldset className="colours"><legend>colours</legend>
        <Palette colours={['red', 'green', 'blue', 'black', 'white']} />
      </fieldset>
    </div>
  );
}

export default connect(({ toolSelected }) => ({ toolSelected }), { changeTool })(Controls);
