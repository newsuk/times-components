import { SearchIndex } from 'algoliasearch';

import { formatArticle, formatByLines } from './formatters';

export type AlgoliaArticle = {
  id: string;
  label: string;
  section?: string;
  topics: any[];
  headline: string;
  bylines: any[];
};
export type IndexedArticle = {
  id: string;
  label: string;
  section?: string;
  content: string;
  topics: any[];
  url: string;
  hasVideo: boolean;
  headline: string;
  shortHeadline: string;
  bylines: any[];
  publishedTime: string;
};

const getDateDaysAgo = (days: number) =>
  Date.now() - days * 1000 * 60 * 60 * 24;

const search = async (
  index: SearchIndex,
  { id: articleId, bylines, topics, headline, section, label }: AlgoliaArticle,
  analyticsStream?: (event: any) => void,
  limitDays?: number
) => {
  const byline = formatByLines(bylines);

  const topicSearch = topics
    ? topics
        .map(
          topic =>
            topic.name.indexOf(' ') >= 0
              ? `"${topic.name.toLowerCase()}"`
              : topic.name.toLowerCase()
        )
        .join(' ')
    : '';

  const headlineSearch = `${headline}`.replace(/[.,()"':;{}[]/g, '');

  const query = `${headlineSearch} ${topicSearch} ${
    byline ? `"${byline.toLowerCase()}"` : ''
  }`.replace(/\s{2,}/g, ' ');

  const matchedAndQuotedWords = query.match(/\w+|"[^"]+"/g);

  const optionalWords =
    matchedAndQuotedWords !== null
      ? matchedAndQuotedWords
          .map(word => word.replace(/"/g, '')) // then remove the quotes
          .filter(word => !word.match(/^[A-Z].*/))
          .filter(word => word && word.length > 0)
      : undefined;

  const filterSection = section && section !== '' ? [`section:${section}`] : [];
  const filterId = articleId ? [`NOT objectID:${articleId}`] : [];
  const publishedDateFilter = limitDays
    ? [`algoliaData.publishedTimestamp >= ${getDateDaysAgo(3)}`]
    : [];

  const filters = [...filterSection, ...filterId, ...publishedDateFilter].join(
    ' AND '
  );

  const searchOptions = {
    hitsPerPage: 3,
    ignorePlurals: true,
    removeStopWords: true,
    optionalWords,
    filters,
    optionalFilters: label && [`label:${label}`],
    typoTolerance: false
  };

  const results = await index.search<AlgoliaArticle>(query, searchOptions);
  analyticsStream &&
    analyticsStream({
      object: 'AlgoliaSearchProvider',
      action: 'Search',
      attr: { query, searchOptions, results }
    });

  return results;
};

export type SearchRelatedArticlesResult = {
  query: string;
  sliceName: string;
  items: any[];
  count: number;
};
export const searchRelatedArticles = async (
  index: SearchIndex,
  article: AlgoliaArticle,
  analyticsStream: (evt: any) => void
): Promise<SearchRelatedArticlesResult | null> => {
  try {
    let searchResults = await search(index, article, analyticsStream, 7);

    // pass 2 - any section
    if (searchResults.hits.length === 0) {
      searchResults = await search(
        index,
        { ...article, section: undefined },
        analyticsStream
      );
    }

    // pass 3 - lowercase headline to make all words optional
    if (searchResults.hits.length === 0) {
      searchResults = await search(
        index,
        {
          ...article,
          headline: article.headline.toLowerCase()
        },
        analyticsStream
      );
    }

    if (searchResults.hits.length > 0) {
      return {
        query: searchResults.query,
        sliceName: 'StandardSlice',
        items: searchResults.hits.map(formatArticle),
        count: searchResults.nbHits
      };
    }
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(e);
  }
  return null;
};

export default searchRelatedArticles;
