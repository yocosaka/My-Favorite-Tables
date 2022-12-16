import { createSlice } from '@reduxjs/toolkit';
import { ItemType } from 'src/constants/variables';
import { ItemsState } from './itemState';
import { RootState } from '..';
import { sampleItems } from '../../constants/sample';

const initialState = {
  items: sampleItems,
} as ItemsState;

const slice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      state.items.filter((item: ItemType) => item.id !== action.payload.id);
    },
    updateItem(state, action) {
      state.items.map((item: ItemType) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item,
      );
    },
  },
});

export default slice.reducer;
export const itemsSelector = (state: RootState): ItemType[] =>
  state.items.items;
export const { addItem, removeItem, updateItem } = slice.actions;
