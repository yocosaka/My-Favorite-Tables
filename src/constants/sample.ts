import { v4 as uuid } from 'uuid';
import { BoardTitles, ItemType } from './variables';

export const sampleItems: ItemType[] = [
  {
    id: uuid(),
    name: 'Mos Burgur Kunitachi',
    category: 'Humburgur',
    area: 'Kunitachi',
    // board: BoardNames.TO_GO,
  },
  {
    id: uuid(),
    name: 'Koenji Thai kaan',
    category: 'Thaifood',
    area: 'Koenji',
    // board: BoardNames.TO_GO,
  },
  {
    id: uuid(),
    name: 'Burgur King Kunitachi',
    category: 'Humburgur',
    area: 'Kunitachi',
    // board: BoardNames.TO_GO,
  },
  {
    id: uuid(),
    name: 'Ichirin',
    category: 'Cake',
    area: 'Kunitachi',
    // board: BoardNames.TO_GO,
  },
  {
    id: uuid(),
    name: 'Komeda Coffee',
    category: 'Cafe',
    area: 'kunitachi',
    // board: BoardNames.TO_GO,
  },
  {
    id: uuid(),
    name: 'sushi near Kunitachi',
    category: 'Sushi',
    area: 'Kunitachi',
    // board: BoardNames.TO_GO,
  },
];

export const boardsData = {
  [uuid()]: {
    title: BoardTitles.TO_GO,
    items: sampleItems,
  },
  [uuid()]: {
    title: BoardTitles.FAVORITES,
    items: [],
  },
  [uuid()]: {
    title: BoardTitles.OKAY,
    items: [],
  },
  [uuid()]: {
    title: BoardTitles.NOT_FAVORITES,
    items: [],
  },
};
