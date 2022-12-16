export enum BoardPath {
  TO_GO = 'want_to_go',
  FAVORITES = 'favorites',
  NOT_FAVORITES = 'not_favorites',
  OKAY = 'okay',
}

export enum BoardTitles {
  TO_GO = 'Want to go',
  FAVORITES = 'Favorites',
  NOT_FAVORITES = 'Not Favorites',
  OKAY = 'Okay',
}

export interface ItemType {
  id: string;
  name: string; // in en
  category: string;
  // board: BoardNames;
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
