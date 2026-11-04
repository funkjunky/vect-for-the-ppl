import { createSlice } from '@reduxjs/toolkit';
import { createEnum } from './common.js';

export const TOOLS = createEnum(['selection', 'line', 'square', 'circle']);

export const toolSelectedSlice = createSlice({
  name: 'toolSelected',
  initialState: { current: TOOLS.line, mousePos: { x:0, y:0 } },
  reducers: {
    changeTool: (state, { payload }) => void (state.current = payload), 
  },
});

export const { changeTool } = toolSelectedSlice.actions;

export default toolSelectedSlice.reducer;
