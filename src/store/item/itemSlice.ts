import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { sampleItems } from '../../constants/sample';
import { ItemsState, ItemType } from './itemState';

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
      state.items.map((item: ItemType) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        } else {
          return item;
        }
      });
    },
  },
});

export default slice.reducer;
export const itemsSelector = (state: RootState): ItemType[] =>
  state.items.items;
export const { addItem, removeItem, updateItem } = slice.actions;
