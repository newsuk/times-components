import React, {
  createContext,
  useMemo,
  useCallback,
  useContext,
  FC
} from 'react';

import algoliasearch from 'algoliasearch';

import {
  searchRelatedArticles,
  AlgoliaArticle,
  SearchRelatedArticlesResult
} from './algoliaRelatedArticles';

const createAlgoliaIndex = (algoliaSearchKeys: AlgoliaSearchKeys) => {
  if (algoliaSearchKeys) {
    const { applicationId, apiKey, indexName } = algoliaSearchKeys;
    return algoliasearch(applicationId, apiKey).initIndex(indexName);
  }

  return null;
};
type AlgoliaSearchContextType = {
  getRelatedArticles?: () => Promise<SearchRelatedArticlesResult | null>;
};
const AlgoliaSearchContext = createContext<AlgoliaSearchContextType>({});

export const AlgoliaSearchProvider: FC<AlgoliaSearchProps> = ({
  algoliaSearchKeys,
  article,
  analyticsStream,
  children
}) => {
  const algoliaIndex = useMemo(() => createAlgoliaIndex(algoliaSearchKeys), [
    algoliaSearchKeys
  ]);

  const getRelatedArticles = useCallback(
    async () => {
      if (algoliaIndex && article) {
        const results = await searchRelatedArticles(
          algoliaIndex,
          article,
          analyticsStream
        );
        return results;
      }
      return null;
    },
    [algoliaIndex, article]
  );

  return (
    <AlgoliaSearchContext.Provider value={{ getRelatedArticles }}>
      {children}
    </AlgoliaSearchContext.Provider>
  );
};

export const useAlgoliaSearch = () => {
  const context = useContext(AlgoliaSearchContext);

  if (context === undefined) {
    throw new Error('must be used within an AlgoliaSearchProvider');
  }
  return context;
};

type AlgoliaSearchKeys = {
  applicationId: string;
  apiKey: string;
  indexName: string;
};

type AlgoliaSearchProps = {
  algoliaSearchKeys: AlgoliaSearchKeys;
  article: AlgoliaArticle | null;
  analyticsStream: (event: any) => void;
};
