type Image = {
  id: number;
  src: string;
  title: string;
  caption?: string;
  credit?: string;
};

export type PuzzleCardItems = {
  hideOnMobile: boolean;
  id: number;
  shortIdentifier: string;
  slug?: string;
  title: string;
  type: string;
  publishedAt: string;
  status: 'COMPLETE' | 'IN PROGRESS' | string;
  gameLevel: string;
  url: string;
  image?: Image;
};

export type Puzzles = {
  list: PuzzleCardItems[];
};
