import { legacy_connect as connect } from 'react-redux'
import { useEffect, useState } from 'react';

import onDraw, { drawLine } from './onDraw.js';
import { add, createLine } from './elements.js';

function Canvas({ elements, toolSelected, add }) {
  const [dragStart, setDragStart] = useState(null);
  const [xy, setXY] = useState({x:0, y:0});
  console.log('elements: ', elements);

  const onMouseDown = e => {
    setDragStart(getMousePos(e));
  };

  const onMouseMove = e => {
    if(dragStart !== null) {
      const xy = getMousePos(e);
      setXY(xy);

      const ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
      onDraw(ctx, elements);
      ctx.strokeStyle = "grey";
      drawLine(ctx, dragStart, xy);
      ctx.strokeStyle = "black";
    }
  };

  const onMouseUp = e => {
    add(createLine(dragStart, getMousePos(e)));
    setDragStart(null);
  };

  const getMousePos = e => {
    const canvas = document.getElementsByTagName('canvas')[0]
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  useEffect(() => {
    const ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
    ctx.canvas.width  = window.getComputedStyle(ctx.canvas).width.match(/\d+/)[0]
    ctx.canvas.height  = window.getComputedStyle(ctx.canvas).height.match(/\d+/)[0]
    onDraw(ctx, elements);
  }, [elements]);

  return (
    <canvas {...{ onMouseMove, onMouseDown, onMouseUp }}/>
  );
}


export default connect(({ elements, toolSelected }) => ({ elements, toolSelected }), { add })(Canvas);
