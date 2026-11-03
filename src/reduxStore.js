import { configureStore } from '@reduxjs/toolkit';

import elements from './elements.js';

export const store = configureStore({
  reducer: {
    elements,
  },
});
