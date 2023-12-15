import { LeadArticleProps } from '../../../components/slices/lead-article/index';

export const groupArticlesByDate = (
  articles: LeadArticleProps[]
): { [key: string]: LeadArticleProps[] } => {
  const initialEmptyObject: { [key: string]: LeadArticleProps[] } = {};
  return articles.reduce((result, article) => {
    const date = article.datePublished && article.datePublished.split('T')[0];

    if (date) {
      result[date] = [...(result[date] || []), article];
    }

    return result;
  }, initialEmptyObject);
};

export const removeDuplicateDates = (data: LeadArticleProps[]) => {
  let uniqueDates = new Set();
  let processedData = data.map(item => {
    let datePublished = item.datePublished;
    if (uniqueDates.has(datePublished)) {
      return { ...item, datePublished: undefined };
    } else {
      uniqueDates.add(datePublished);
      return item;
    }
  });
  return processedData;
};

export const sortByDatePublished = (
  a: LeadArticleProps,
  b: LeadArticleProps,
  sortOrder: 'asc' | 'dsc' = 'asc'
) => {
  const dateA = a.datePublished ? new Date(a.datePublished) : null;
  const dateB = b.datePublished ? new Date(b.datePublished) : null;

  const numA = dateA !== null ? dateA.getTime() : 0;
  const numB = dateB !== null ? dateB.getTime() : 0;

  return sortOrder === 'asc' ? numA - numB : numB - numA;
};
