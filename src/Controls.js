import Palette from './Palette.js';

import './Controls.css';

function Controls() {
  return (
    <div className="Controls">
      <div className="buttons">
        <button onClick={() => console.log('sdgsd')}>+</button>
        <button onClick={() => console.log('sdfgsd')}>/</button>
        <button onClick={() => console.log('sdfgsfhd')}>□</button>
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

export default Controls;
