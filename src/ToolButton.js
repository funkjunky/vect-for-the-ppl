import { useDispatch, useSelector } from 'react-redux';

import { changeTool } from './toolSelected.js';

function ToolButton({ tool, children }) {
  const d = useDispatch();
  const { current } = useSelector(({ toolSelected }) => toolSelected);

  return <button
    onClick={() => d(changeTool(tool))}
    style={{ backgroundColor: current === tool ? 'white' : 'grey' }}
    title={tool}>{children}</button>
}

export default ToolButton;
