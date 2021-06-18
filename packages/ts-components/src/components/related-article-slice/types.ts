export type Asset = {
  id?: string;
  title?: string | null;
  posterImage?: Asset;
  crop169?: { url: string };
  crop32?: { url: string };
};

type Byline = {
  name: string;
  children: Array<{
    name: string;
    children: any[];
    attributes: { [attribute: string]: string };
  }>;
  attributes?: { [attribute: string]: string };
};

type Bylines = Array<{ byline: Byline[]; image?: any }>;

type Summary = {
  name: string;
  attributes?: { [attribute: string]: string };
  children: Summary[];
};

export type RelatedArticle = {
  leadAsset: Asset | null;
  id: string;
  label: string | null;
  bylines: Bylines;
  headline: string;
  shortHeadline: string | null;
  standfirst?: string;
  summary105: Summary[];
  summary125: Summary[];
  summary145: Summary[];
  summary160: Summary[];
  summary175: Summary[];
  summary225: Summary[];
  publishedTime?: string;
  updatedTime?: string;
  template?: string;
  url: string;
  hasVideo?: boolean;
  publicationName: string;
  section: string;
  shortIdentifier?: string;
  slug?: string;
};

export type RelatedArticles = {
  sliceName: string;
  items: Array<{
    leadAsset?: Asset | null;
    article: RelatedArticle;
  }>;
};
