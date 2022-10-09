import logger from 'redux-logger';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import itemReducer from './item/itemSlice';

const store = configureStore({
  reducer: combineReducers({
   items: itemReducer,
  }),
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
