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
  category: string; //customizable by users
  // board: BoardNames;
  area: string; //customizable by users
  needToBook?: boolean;
  review?: {
    atmosphere: ReviewType;
    taste: ReviewType;
    hospitality: ReviewType;
    convenience: ReviewType;
    cost_performance: ReviewType;
  };
  scene?: string[];
  gmapInfo?: {
    // data gets from api
    types?: string[]; // table.types
    icon?: string; // table.icon -> src
    opening_hours?: string[]; // table.opening_hours.weekday_text? string[]
    address?: string; // table.formatted_address
    main_photo?: string; // table.photos[0].getUrl();
    gmapUrl?: string; // table.url
    websiteUrl: string; // table.website
    tel?: string; //table.formatted_phone_number
    price_level?: number; //table.price_level
  };
  memo?: string;
  favoriteMenus?: {
    title: string;
    price?: number;
    photo?: string;
  }[];
  photos?: string[];
}

export type ReviewType = null | 1 | 2 | 3 | 4 | 5;
