export const createEnum = arr => arr.reduce((types, t) => { types[t] = t; return types; }, {});

export const getLineLength = (a, b) => {
  const x = b.x - a.x;
  const y = b.y - a.y;
  return Math.sqrt(x*x + y*y);
};
