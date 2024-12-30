export type ArticleProps = {
  id: number;
  image: {
    alt: string;
    url: string;
  };
  label: string;
  headline: string;
  summary: string;
  url: string;
};

export interface ArticleCardProps {
  article: ArticleProps;
  sectionTitle: string;
  numOfArticles: number;
  isLeadingArticle: boolean;
  isLastCard: boolean;
}

export interface ElementAttr {
  articles: string; // Base64-encoded string of ArticleProps[]
  title: string;
}

export interface ArticleCardsProps {
  element: ElementAttr;
}
