export type SliceArticle = {
  id?: string;
  url?: string;
  label?: string;
  byline?: string;
  headline: string;
  standfirst?: string;
  summary?: string;
  cta?: string;
  datePublished?: string;
  dateUpdated?: string;
  template?: string;
  images: {
    alt?: string;
    crops: Array<{
      url: string;
      ratio: string;
    }>;
  };
};

export type SliceSlot = {
  article?: SliceArticle;
};

export type SliceData = {
  name: string;
  children: SliceSlot[];
};
