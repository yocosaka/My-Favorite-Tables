import { BoardNames } from './variables';
import { v4 as uuid } from 'uuid';
import { ItemType } from '../store/item/itemState';

export const sampleItems: ItemType[] = [
  {
    id: uuid(),
    name: 'Mos Burgur Kunitachi',
    category: 'Humburgur',
    board: BoardNames.GO_TO,
  },
  {
    id: uuid(),
    name: 'Koenji Thai kaan',
    category: 'Thaifood',
    board: BoardNames.GO_TO,
  },
  {
    id: uuid(),
    name: 'Burgur King Kunitachi',
    category: 'Humburgur',
    board: BoardNames.GO_TO,
  },
];
