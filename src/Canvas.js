import { legacy_connect as connect } from 'react-redux'
import { useEffect, useState } from 'react';

import onDraw, { drawLine, strokeCircle, fillCircle } from './onDraw.js';
import { add, createSquare, createCircle, createLine, createFilledCircle, createFilledSquare } from './elements.js';
import { TOOLS } from './toolSelected.js';

const getLineLength = (a, b) => {
  const x = b.x - a.x;
  const y = b.y - a.y;
  return Math.sqrt(x*x + y*y);
};

function Canvas({ elements, toolSelected, add }) {
  const [dragStart, setDragStart] = useState(null);
  const [xy, setXY] = useState({x:0, y:0});
  console.log('elements: ', toolSelected, elements);

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
      ctx.fillStyle = "grey";
      switch(toolSelected.current) {
        case TOOLS.line:
          drawLine(ctx, dragStart, xy);
          break;

        case TOOLS.square:
          const width = xy.x - dragStart.x;
          const height = xy.y - dragStart.y;
          ctx.strokeRect(dragStart.x, dragStart.y, width, height);
          break;

        case TOOLS.filledSquare:
          const w= xy.x - dragStart.x;
          const h= xy.y - dragStart.y;
          ctx.fillRect(dragStart.x, dragStart.y, w, h);
          break;

        case TOOLS.circle: {
          const radius = getLineLength(dragStart, xy);
          strokeCircle(ctx, dragStart.x, dragStart.y, radius);
          break;
        }
        case TOOLS.filledCircle: {
          const radius = getLineLength(dragStart, xy);
          fillCircle(ctx, dragStart.x, dragStart.y, radius);
          break;
        }

        default: console.warn('no tool selected for mousemove', toolSelected);
      }
      ctx.strokeStyle = "black";
      ctx.fillStyle = "black";
    }
  };

  const onMouseUp = e => {
    const xy = getMousePos(e);

    switch(toolSelected.current) {
      case TOOLS.line:
        add(createLine(dragStart, xy));
        break;

      case TOOLS.square:
        const width = xy.x - dragStart.x;
        const height = xy.y - dragStart.y;
        add(createSquare(dragStart.x, dragStart.y, width, height));
        break;

      case TOOLS.filledSquare: {
        const width = xy.x - dragStart.x;
        const height = xy.y - dragStart.y;
        add(createFilledSquare(dragStart.x, dragStart.y, width, height));
        break;
      }
      case TOOLS.circle: {
        const radius = getLineLength(dragStart, xy);
        add(createCircle(dragStart.x, dragStart.y, radius));
        break;
      }

      case TOOLS.filledCircle:
        const radius = getLineLength(dragStart, xy);
        add(createFilledCircle(dragStart.x, dragStart.y, radius));
        break;

      default: console.warn('no tool on mouse up', toolSelected);
    }

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
