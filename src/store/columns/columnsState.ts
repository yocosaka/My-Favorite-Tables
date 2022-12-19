import { BoardTitles, TableType } from 'src/constants/variables';

export interface ColumnsState {
  columns: ColumnsType;
}

export type ColumnsType = {
  [x: string]: {
    title: BoardTitles;
    items: TableType[];
  };
};
