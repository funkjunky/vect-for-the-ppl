import { TYPE } from './elements.js';

export const drawLine = (ctx, p1, p2) => {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
};

const onDraw = (ctx, elements) => {
  ctx.clearRect(0, 0, 2000, 2000); // TODO: be less lazy
  elements.forEach(({ type, attrs }) => {
    switch (type) {
      case TYPE.line:
        drawLine(ctx, attrs.p1, attrs.p2);
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
};

export default onDraw;
