import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../slices/sidebar';

export default configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});
