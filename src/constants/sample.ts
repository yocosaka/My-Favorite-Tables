import { v4 as uuid } from 'uuid';
import { BoardTitles, TableType } from './variables';

export const sampleItems: TableType[] = [
  {
    id: uuid(),
    name: 'Mos Burgur Kunitachi',
    category: 'Humburgur',
    area: 'Kunitachi',
    gmapInfo: {
      types: ['restaurant', 'food', 'cafe'],
    },
  },
  {
    id: uuid(),
    name: 'Koenji Thai kaan',
    category: 'Thaifood',
    area: 'Koenji',
    gmapInfo: {
      types: ['restaurant', 'food', 'cafe'],
    },
  },
  {
    id: uuid(),
    name: 'Burgur King Kunitachi',
    category: 'Humburgur',
    area: 'Kunitachi',
    gmapInfo: {
      types: ['restaurant', 'food', 'cafe'],
    },
  },
  {
    id: uuid(),
    name: 'Ichirin',
    category: 'Cake',
    area: 'Kunitachi',
    gmapInfo: {
      types: ['restaurant', 'food', 'cafe'],
    },
  },
  {
    id: uuid(),
    name: 'Komeda Coffee',
    category: 'Cafe',
    area: 'kunitachi',
    gmapInfo: {
      types: ['restaurant', 'food', 'cafe'],
    },
  },
  {
    id: uuid(),
    name: 'sushi near Kunitachi',
    category: 'Sushi',
    area: 'Kunitachi',
    gmapInfo: {
      types: ['restaurant', 'food', 'cafe'],
    },
  },
];

export const boardsData = {
  togo: {
    title: BoardTitles.TO_GO,
    items: sampleItems,
  },
  favorites: {
    title: BoardTitles.FAVORITES,
    items: [],
  },
  okay: {
    title: BoardTitles.OKAY,
    items: [],
  },
  not_favorites: {
    title: BoardTitles.NOT_FAVORITES,
    items: [],
  },
};
