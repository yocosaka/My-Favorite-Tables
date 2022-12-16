import { createSlice } from '@reduxjs/toolkit';
import { boardsData } from 'src/constants/sample';
import { ColumnsState, ColumnsType } from './columnsState';
import { RootState } from '..';

const initialState = {
  columns: boardsData,
} as ColumnsState;

const slice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    updateColumns(state, action) {
      state.columns = action.payload;
    },
  },
});

export default slice.reducer;
export const columnsSelector = (state: RootState): ColumnsType =>
  state.columns.columns;
export const { updateColumns } = slice.actions;
