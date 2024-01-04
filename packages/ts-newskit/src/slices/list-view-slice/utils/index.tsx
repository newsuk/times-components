import { LeadArticleProps } from '../../../components/slices/lead-article/index';

export const groupArticlesByDate = (
  articles: LeadArticleProps[]
): { [key: string]: LeadArticleProps[] } => {
  const initialEmptyObject: { [key: string]: LeadArticleProps[] } = {};
  return articles.reduce((result, article) => {
    const date = article.datePublished && article.datePublished.split('T')[0];
    result[date] = [...(result[date] || []), article];

    return result;
  }, initialEmptyObject);
};

export const sortByDatePublished = (
  a: LeadArticleProps,
  b: LeadArticleProps,
  sortOrder: 'asc' | 'dsc' = 'asc'
) => {
  const dateA = new Date(a.datePublished);
  const dateB = new Date(b.datePublished);

  const numA = dateA.getTime();
  const numB = dateB.getTime();

  return sortOrder === 'asc' ? numA - numB : numB - numA;
};
