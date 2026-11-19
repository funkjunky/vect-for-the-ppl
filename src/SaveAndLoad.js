import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { toggleSaveAndLoad } from './toolSelected.js';
import { load } from './elements.js';

function SaveAndLoad() {
  const dispatch = useDispatch();
  const elements = useSelector(({ elements }) => elements);
  const [json, setJson] = useState(JSON.stringify(elements, null, '\t'));

  return (
    <div className="SaveAndLoad">
      <button onClick={() => dispatch(toggleSaveAndLoad())} className="close">Close - X</button>
      <textarea value={json} onChange={({ target }) => setJson(target.value)} />
      <button onClick={() => {dispatch(load(json)); dispatch(toggleSaveAndLoad());}}>Load</button>
      <button onClick={() => navigator.clipboard.writeText(json)}>Copy</button>
    </div>
  );
}

export default SaveAndLoad;
