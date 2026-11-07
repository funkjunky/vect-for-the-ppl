import { useSelector, useDispatch } from 'react-redux'

import { TYPE, update } from './elements.js';
import { changeColourLink, changeStrokeStyle, changeFillStyle, changeLineWidth, setText, TOOLS } from './toolSelected';
import ToolButton from './ToolButton.js';
import DispatchingRange from './DispatchingRange.js';
import Palette from './Palette.js';

import './Controls.css';

function Controls() {
  const d = useDispatch();
  const { current, text, lineWidth, strokeStyle, fillStyle, colourLink, selection } = useSelector(({ toolSelected }) => toolSelected);

  const LinkCheckbox = <input type="checkbox" onChange={({ target }) => changeColourLink(target.checked)} checked={colourLink} />

  return (
    <div className="Controls">
      <div className="buttons">
        <ToolButton tool={TOOLS.selection}>✥</ToolButton>
        <ToolButton tool={TOOLS.text}>Ⅰ</ToolButton>
        <ToolButton tool={TOOLS.line}>/</ToolButton>
        <ToolButton tool={TOOLS.square}>□</ToolButton>
        <ToolButton tool={TOOLS.filledSquare}>■</ToolButton>
        <ToolButton tool={TOOLS.circle}>○</ToolButton>
        <ToolButton tool={TOOLS.filledCircle}>●</ToolButton>
      </div>
      <div className="properties">
        <p>Element Properties</p>
        {(current === TOOLS.text || (current === TOOLS.selection && selection?.type === TYPE.text)) &&
          <fieldset><legend>Text</legend>
            <textarea value={text} onChange={({ target }) => {
              d(setText(target.value));
              if (current === TOOLS.selection) d(update({ id: selection.id, attrs: { text: target.value } }));
            }} autoFocus />
          </fieldset>
        }
        <DispatchingRange min="2" max="42" step="4" value={lineWidth} action={changeLineWidth} label="Line Width" />
        <fieldset className="colours"><legend>colours</legend>
          <Palette colours={['red', 'green', 'blue', 'black', 'white']} value={strokeStyle} onChange={colour => d(changeStrokeStyle(colour))} />
        </fieldset>
        <fieldset className="colours"><legend>fill colours ({LinkCheckbox} link)</legend>
          { !colourLink &&
            <Palette colours={['red', 'green', 'blue', 'black', 'white']} value={fillStyle} onChange={colour => d(changeFillStyle(colour))} />
          }
        </fieldset>
      </div>
    </div>
  );
}

export default Controls;
