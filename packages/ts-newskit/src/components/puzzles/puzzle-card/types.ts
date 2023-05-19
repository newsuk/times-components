export type Image = {
  id: string;
  title?: string;
  caption?: string;
  credit?: string;
  crops: Array<{
    ratio?: string;
    url?: string;
  }>;
  crop: {
    ratio?: string;
    url?: string;
  };
};
