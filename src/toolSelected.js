import { createSlice } from '@reduxjs/toolkit';
import { createEnum } from './common.js';

export const TOOLS = createEnum(['selection', 'text', 'line', 'square', 'circle', 'filledSquare', 'filledCircle']);

export const toolSelectedSlice = createSlice({
  name: 'toolSelected',
  initialState: { current: TOOLS.line, strokeStyle: 'black', colourLink: false, fillStyle: 'green', lineWidth: 2, text: '' },
  reducers: {
    changeTool: (state, { payload }) => void (state.current = payload),
    changeStrokeStyle: (state, { payload }) => void (state.strokeStyle = payload),
    changeFillStyle: (state, { payload }) => void (state.fillStyle = payload),
    changeColourLink: (state, { payload }) => void (state.colourLink = payload),
    changeLineWidth: (state, { payload }) => void (state.lineWidth = payload),
    setSelection: (state, { payload }) => void (state.selection = payload),
    setText: (state, { payload }) => void (state.text = payload),
  },
});

export const { changeTool, changeStrokeStyle, changeFillStyle, changeColourLink, changeLineWidth, setSelection, setText } = toolSelectedSlice.actions;

export default toolSelectedSlice.reducer;
