import logger from 'redux-logger';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import columnsReducer from './columns/columnsSlice';

const store = configureStore({
  reducer: combineReducers({
    columns: columnsReducer,
  }),
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

// TODO: Comment out this below line when deploying
store.subscribe(() => console.log(store.getState()));
