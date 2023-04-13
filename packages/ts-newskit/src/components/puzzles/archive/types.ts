type Image = {
  caption: string;
  credit: string;
  id: number;
  title: string;
};

export type Puzzle = {
  hideOnMobile: boolean;
  id: number;
  image?: Image;
  shortIdentifier: string;
  slug: string;
  title: string;
  type: string;
  url: string;
  publishedAt: string; // needs to be added
  status: 'COMPLETE' | 'IN PROGRESS' | string; // needs to be added
  gameLevel: string; // needs to be added
};

export type Puzzles = {
  list: Puzzle[];
};
