import { createSlice } from '@reduxjs/toolkit';

export const TYPE = ['line', 'square', 'circle'].reduce((types, t) => { types[t] = t; return types; }, {});

export const createLine = (p1, p2) => createElement(TYPE.line, { p1, p2 }); 
export const createSquare = (x, y, width, height) => createElement(TYPE.square, { x, y, width, height });
export const createCircle = (x, y, radius) => createElement(TYPE.circle, { x, y, radius });

let idSeed = 0;
export const createElement = (type, attrs) => ({
  id: ++idSeed,
  type,
  attrs,
});

const sampleShapes = [
  createLine({ x: 20, y: 30 }, { x: 40, y: 10 }),
  createSquare(40, 30, 10, 20),
  createCircle(20, 10, 5),
];

export const elementsSlice = createSlice({
  name: 'elements',
  initialState: sampleShapes,
  reducers: {
    add: (state, { payload }) => state.push(payload),
    update: (state, { payload }) => state[state.findIndex(({ id }) => id === payload.id)] = payload, //TODO: will redux recognize the alterati
    remove: (state, { payload }) => void state.splice(state.findIndex(element => element.id === payload.id), 1),
  },
});

export default elementsSlice.reducer;
