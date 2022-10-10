import { BoardNames } from '../../constants/variables';

export interface ItemsState {
  items: ItemType[];
}

export interface ItemType {
  id: string;
  name: string; // in en
  category: string;
  board: BoardNames;
  area: string;
  needToBook?: boolean;
  review?: {
    atmosphere: ReviewType;
    taste: ReviewType;
    hospitality: ReviewType;
    convenience: ReviewType;
    price: ReviewType;
  };
  scene?: string[];
  gmapInfo?: {
    id: string;
    // map
    // address
    // tel
    // name in Jp
    // price range $$
    // open hours
    // website url
    // popular times
    // main photo
  };
  memo?: string;
  favoriteMenus?: {
    title: string;
    price?: number;
    // photo: string;
  }[];
  // photos?: string[];
}

export type ReviewType = null | 1 | 2 | 3 | 4 | 5;
