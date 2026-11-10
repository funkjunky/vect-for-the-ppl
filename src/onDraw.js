import { TYPE } from './elements.js';

export const drawLine = (ctx, p1, p2) => {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
};

export const strokeCircle = (ctx, x, y, radius) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
};

export const fillCircle = (ctx, x, y, radius) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
};

export const drawElement = (ctx, { type, attrs }) => {
  switch (type) {
    case TYPE.text:
      if(attrs.textSize) ctx.font = `${attrs.textSize}px serif`;
      ctx.fillText(attrs.text, attrs.x, attrs.y);
      break;
    case TYPE.line:
      drawLine(ctx, attrs.p1, attrs.p2);
      break;
    case TYPE.square:
      ctx.strokeRect(attrs.x, attrs.y, attrs.width, attrs.height);
      break;
    case TYPE.filledSquare:
      ctx.fillRect(attrs.x, attrs.y, attrs.width, attrs.height);
      break;
    case TYPE.circle:
      strokeCircle(ctx, attrs.x, attrs.y, attrs.radius);
      break;
    case TYPE.filledCircle:
      fillCircle(ctx, attrs.x, attrs.y, attrs.radius);
      break;
    default: console.warn('invalid element type. type: ', type);
  }
};

const onDraw = (ctx, elements) => {
  ctx.clearRect(0, 0, 2000, 2000); // TODO: be less lazy
  ctx.textBaseline = 'hanging';
  elements.forEach(element => {
    const { attrs } = element;
    ctx.save();
    if(attrs.strokeStyle) ctx.strokeStyle = attrs.strokeStyle;
    if(attrs.colourLink) ctx.fillStyle = attrs.strokeStyle;
    else if(attrs.fillStyle) ctx.fillStyle = attrs.fillStyle;
    if(attrs.lineWidth) ctx.lineWidth = attrs.lineWidth;
    //ctx.lineWidth ?= attrs.lineWidth;

    drawElement(ctx, element);

    ctx.restore();
  });
};

export default onDraw;
