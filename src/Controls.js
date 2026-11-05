import { legacy_connect as connect } from 'react-redux'

import { changeTool, changeColourLink, changeStrokeStyle, changeFillStyle, TOOLS } from './toolSelected';
import Palette from './Palette.js';

import './Controls.css';

function Controls({ toolSelected, changeTool, changeColourLink, changeStrokeStyle, changeFillStyle }) {
  const LinkCheckbox = ({ ...props }) => (
    <input type="checkbox" onChange={({ target }) => changeColourLink(target.checked)} checked={toolSelected.colourLink} {...props} />
  );

  return (
    <div className="Controls">
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
        <Palette colours={['red', 'green', 'blue', 'black', 'white']} value={toolSelected.strokeStyle} onChange={colour => changeStrokeStyle(colour)} />
      </fieldset>
      <fieldset className="colours"><legend>fill colours (<LinkCheckbox /> link)</legend>
        { !toolSelected.colourLink &&
          <Palette colours={['red', 'green', 'blue', 'black', 'white']} value={toolSelected.fillStyle} onChange={colour => changeFillStyle(colour)} />
        }
      </fieldset>
    </div>
  );
}

export default connect(({ toolSelected }) => ({ toolSelected }), { changeTool, changeColourLink, changeStrokeStyle, changeFillStyle })(Controls);
