export type ArticleBookmark = {
  isBookmarked: boolean;
};

export interface ContentProps {
  loading?: boolean;
  error?: string;
  data?: ArticleBookmark;
}
