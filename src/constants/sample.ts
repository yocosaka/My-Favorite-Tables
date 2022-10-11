import { v4 as uuid } from 'uuid';
import { BoardNames } from './variables';
import { ItemType } from '../store/item/itemState';

export const sampleItems: ItemType[] = [
  {
    id: uuid(),
    name: 'Mos Burgur Kunitachi',
    category: 'Humburgur',
    area: 'Kunitachi',
    board: BoardNames.GO_TO,
  },
  {
    id: uuid(),
    name: 'Koenji Thai kaan',
    category: 'Thaifood',
    area: 'Koenji',
    board: BoardNames.GO_TO,
  },
  {
    id: uuid(),
    name: 'Burgur King Kunitachi',
    category: 'Humburgur',
    area: 'Kunitachi',
    board: BoardNames.GO_TO,
  },
  {
    id: uuid(),
    name: 'Ichirin',
    category: 'Cake',
    area: 'Kunitachi',
    board: BoardNames.GO_TO,
  },
  {
    id: uuid(),
    name: 'Komeda Coffee',
    category: 'Cafe',
    area: 'kunitachi',
    board: BoardNames.GO_TO,
  },
  {
    id: uuid(),
    name: 'Sushiro',
    category: 'Sushi',
    area: 'tachikawa saiwaicho',
    board: BoardNames.GO_TO,
  },
];
