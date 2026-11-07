import { createSlice } from '@reduxjs/toolkit';
import { createEnum } from './common.js';

export const TYPE = createEnum(['text', 'line', 'square', 'circle', 'filledSquare', 'filledCircle']);

export const createText = (x, y, text, measureTextResult) => {
  const { width, height } = measureTextResult;
  return createElement(TYPE.text, { x, y, text, width, height });
}
export const createLine = (p1, p2, props) => createElement(TYPE.line, { p1, p2, ...props }); 
export const createSquare = (x, y, width, height, props) => createElement(TYPE.square, { x, y, width, height, ...props });
export const createCircle = (x, y, radius, props) => createElement(TYPE.circle, { x, y, radius, ...props });
export const createFilledSquare = (x, y, width, height, props) => createElement(TYPE.filledSquare, { x, y, width, height, ...props });
export const createFilledCircle = (x, y, radius, props) => createElement(TYPE.filledCircle, { x, y, radius, ...props });

let idSeed = 0;
export const createElement = (type, attrs) => ({
  id: ++idSeed,
  type,
  attrs,
});

const sampleShapes = [
  createLine({ x: 20, y: 30 }, { x: 40, y: 10 }, { strokeStyle: 'green' }),
  createSquare(40, 30, 10, 20, { strokeStyle: 'red', fillStyle: 'blue' }),
  createCircle(20, 10, 5),
];

export const elementsSlice = createSlice({
  name: 'elements',
  initialState: sampleShapes,
  reducers: {
    add: (state, { payload }) => void state.push(payload),
    update: (state, { payload: { id: pid, attrs } }) => {
      const element = state[state.findIndex(({ id }) => pid === id)];
      Object.entries(attrs).forEach(([k, v]) => {
        element.attrs[k] = v;
      });
    }, //TODO: will redux recognize
    remove: (state, { payload }) => void state.splice(state.findIndex(element => element.id === payload.id), 1),
  },
});

export const { add, update, remove } = elementsSlice.actions;

export const addElement = element => (dispatch, getState) => {
  element.attrs = { ...element.attrs, ...getState().toolSelected }; //TODO: lazy... we only need certain attrs from toolSelected
  dispatch(add(element));
  console.log('added element: ', element);
};

export default elementsSlice.reducer;
