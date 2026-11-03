import { legacy_connect as connect } from 'react-redux'
import { useEffect } from 'react';

import { TYPE } from './elements.js';

function Canvas({ elements }) {
  useEffect(() => {
    const ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
    ctx.canvas.width  = window.getComputedStyle(ctx.canvas).width.match(/\d+/)[0]
    ctx.canvas.height  = window.getComputedStyle(ctx.canvas).height.match(/\d+/)[0]
    ctx.clearRect(0, 0, 2000, 2000); // TODO: be less lazy
    console.log('elements: ', elements);
    elements.forEach(({ type, attrs }) => {
      switch (type) {
        case TYPE.line:
          ctx.beginPath();
          ctx.moveTo(attrs.p1.x, attrs.p1.y);
          ctx.lineTo(attrs.p2.x, attrs.p2.y);
          ctx.stroke();
          break;
        case TYPE.square:
          ctx.strokeRect(attrs.x, attrs.y, attrs.width, attrs.height);
          break;
        case TYPE.circle:
          ctx.beginPath();
          ctx.arc(attrs.x, attrs.y, attrs.radius, 0, Math.PI * 2);
          ctx.stroke();
          break;
        default: console.warn('invalid element type. Element: ', elements);
      }
    });
  }, []);

  return (
    <canvas />
  );
}

export default connect(({ elements }) => ({ elements }))(Canvas);
