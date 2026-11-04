import { configureStore } from '@reduxjs/toolkit';

import elements from './elements.js';
import toolSelected from './toolSelected.js';

export const store = configureStore({
  reducer: {
    elements,
    toolSelected,
  },
});
