import { legacy_connect as connect } from 'react-redux'
import { useEffect, useState } from 'react';

import onDraw, { drawElement, drawLine, strokeCircle, fillCircle } from './onDraw.js';
import { getElementsPointTouches, TYPE, update, addElement, createText, createSquare, createCircle, createLine } from './elements.js';
import { TOOLS, setSelection, setText } from './toolSelected.js';
import { getLineLength } from './common.js';

function Canvas({ elements, toolSelected, addElement, setSelection, update, setText }) {
  const [dragStart, setDragStart] = useState(null);

  const onMouseDown = e => {
    setDragStart(getMousePos(e));
    if(toolSelected.current === TOOLS.selection) {
      const elementTouchingCursor = getElementsPointTouches(getMousePos(e), elements)[0];
      setSelection(elementTouchingCursor);
      console.log('selected: ', elementTouchingCursor);
    }
  };

  const onMouseMove = e => {
    if(dragStart !== null) {
      const xy = getMousePos(e);

      const ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
      onDraw(ctx, elements);
      ctx.strokeStyle = "grey";
      ctx.fillStyle = "grey";
      switch(toolSelected.current) {
        case TOOLS.selection:
          if (!toolSelected.selection) break;
          const { type, attrs } = toolSelected.selection;
          const delta = { x: xy.x - dragStart.x, y: xy.y - dragStart.y };
          if (toolSelected.selection.type === TYPE.line) {
            drawElement(ctx, { type, attrs: { ...attrs,
              p1: { x: attrs.p1.x + delta.x, y: attrs.p1.y + delta.y },
              p2: { x: attrs.p2.x + delta.x, y: attrs.p2.y + delta.y },
            } } );
          } else {
            drawElement(ctx, { type, attrs: { ...attrs, x: xy.x, y: xy.y } } );
          }
          break;
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
      case TOOLS.selection:
        if (!toolSelected.selection) break;
        let attrs; // TODO: I don't like using let.... I can avoid it...
        if (toolSelected.selection.type === TYPE.line) {
          const { attrs: { p1, p2 } } = toolSelected.selection;
          const delta = { x: xy.x - dragStart.x, y: xy.y - dragStart.y };
          attrs = {
            p1: { x: p1.x + delta.x, y: p1.y + delta.y },
            p2: { x: p2.x + delta.x, y: p2.y + delta.y },
          };
        } else {
          attrs = { x: xy.x, y: xy.y };
        }
        if (toolSelected.selection.type === TYPE.text) {
          setText(toolSelected.selection.attrs.text);
        }
        update({ id: toolSelected.selection.id, attrs });
        break;
      case TOOLS.text:
        const text = toolSelected.text;
        const ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
        if(toolSelected.textSize) ctx.font = `${toolSelected.textSize}px serif`;
        const measureTextResult = ctx.measureText(text);
        measureTextResult.height = measureTextResult.actualBoundingBoxDescent; //warning: based on baseline
        addElement(createText(xy.x, xy.y, text, measureTextResult));
        break;
      case TOOLS.line:
        addElement(createLine(dragStart, xy));
        break;

      case TOOLS.square:
        const width = xy.x - dragStart.x;
        const height = xy.y - dragStart.y;
        addElement(createSquare(dragStart.x, dragStart.y, width, height));
        break;

      case TOOLS.filledSquare: {
        const width = xy.x - dragStart.x;
        const height = xy.y - dragStart.y;
        addElement(createSquare(dragStart.x, dragStart.y, width, height, {}, 'filled'));
        break;
      }
      case TOOLS.circle: {
        const radius = getLineLength(dragStart, xy);
        addElement(createCircle(dragStart.x, dragStart.y, radius));
        break;
      }

      case TOOLS.filledCircle:
        const radius = getLineLength(dragStart, xy);
        addElement(createCircle(dragStart.x, dragStart.y, radius, {}, 'filled'));
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


export default connect(({ elements, toolSelected }) => ({ elements, toolSelected }), { addElement, setSelection, update, setText })(Canvas);
