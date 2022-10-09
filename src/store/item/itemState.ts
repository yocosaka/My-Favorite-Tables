import { BoardNames } from '../../constants/variables';

export interface ItemsState {
  items: ItemType[];
}

export interface ItemType {
  id: string;
  name: string;
  category: string;
  board: BoardNames;
}
