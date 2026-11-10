import { useSelector, useDispatch } from 'react-redux'

import { TYPE, update, shiftTop, shiftUp, shiftDown, shiftBottom, ATTRS } from './elements.js';
import { changeColourLink, changeStrokeStyle, changeFillStyle, changeLineWidth, changeText, changeTextSize, TOOLS } from './toolSelected';
import ToolButton from './ToolButton.js';
import DispatchingRange from './DispatchingRange.js';
import Palette from './Palette.js';

import './Controls.css';

function Controls() {
  const d = useDispatch();
  const toolSelected = useSelector(({ toolSelected }) => toolSelected);
  const { current, colourLink, selection } = toolSelected;
  const elements = useSelector(({ elements }) => elements);

  const LinkCheckbox = <input type="checkbox" onChange={({ target }) => changeColourLink(target.checked)} checked={colourLink} />;

  // calls action, then if we're doing a selection, also calls the passed update function
  const ToolOnChange = (action, attrToUpdate) => ({ target }) => {
    if (current === TOOLS.selection && selection) d(update({ id: selection.id, attrs: { [attrToUpdate]: target.value } }));
    else d(action(target.value));
  }

  //this sorta sucks as naming...
  const getValue = attrKey => (current === TOOLS.selection && selection) ? selection.attrs[attrKey] : toolSelected[attrKey];

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
          <div>
            <fieldset><legend>Text</legend>
              <textarea value={getValue(ATTRS.text)} autoFocus
                onChange={ToolOnChange(changeText, ATTRS.text)} />
            </fieldset>
            <DispatchingRange min="8" max="128" step="2" value={getValue(ATTRS.textSize)} label="Text Size"
              onChange={ToolOnChange(changeTextSize, ATTRS.textSize)} />
          </div>
        }
        {(current === TOOLS.selection && selection) &&
          <fieldset><legend>Depth - {elements.findIndex(({id}) => id === selection.id) + 1} out of {elements.length}</legend>
            <button onClick={() => d(shiftTop(selection))}>⤒</button>
            <button onClick={() => d(shiftUp(selection))}>↑</button>
            <button onClick={() => d(shiftDown(selection))}>↓</button>
            <button onClick={() => d(shiftBottom(selection))}>⤓</button>
          </fieldset>
        }
          <DispatchingRange min="2" max="42" step="4" value={getValue(ATTRS.lineWidth)} label="Line Width"
            onChange={ToolOnChange(changeLineWidth, ATTRS.lineWidth)} />
        <fieldset className="colours"><legend>colours</legend>
          <Palette colours={['red', 'green', 'blue', 'black', 'white']} value={getValue(ATTRS.strokeStyle)}
            onChange={ToolOnChange(changeStrokeStyle, ATTRS.strokeStyle)} />
        </fieldset>
        <fieldset className="colours"><legend>fill colours ({LinkCheckbox} link)</legend>
          { !colourLink &&
            <Palette colours={['red', 'green', 'blue', 'black', 'white']} value={getValue(ATTRS.fillStyle)}
              onChange={ToolOnChange(changeFillStyle, ATTRS.fillStyle)} />
          }
        </fieldset>
      </div>
    </div>
  );
}

export default Controls;
