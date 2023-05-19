type Image = {
  id: string;
  title?: string;
  caption?: string;
  credit?: string;
  crops: Array<{
    ratio?: string;
    url?: string;
  }>;
  crop?: {
    ratio?: string;
    url?: string;
  };
};

export type Puzzle = {
  hideOnMobile: boolean;
  id: string;
  image: Image;
  shortIdentifier?: string;
  slug?: string;
  title: string;
  type?: string;
  url: string;
  publishedAt: string; // needs to be added
  status?: 'COMPLETE' | 'IN PROGRESS' | string; // needs to be added
  gameLevel?: string; // needs to be added
};

export type Puzzles = {
  list: Puzzle[];
};
