import React, { createContext, useMemo, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import algoliasearch from "algoliasearch";

import searchRelatedArticles from "./algolia-related-articles";

const createAlgoliaIndex = algoliaSearchKeys => {
  if (algoliaSearchKeys) {
    const { applicationId, apiKey, indexName } = algoliaSearchKeys;
    return algoliasearch(applicationId, apiKey).initIndex(indexName);
  }

  return null;
};

const AlgoliaSearchContext = createContext();

const AlgoliaSearchProvider = ({ algoliaSearchKeys, article, children }) => {
  const algoliaIndex = useMemo(() => createAlgoliaIndex(algoliaSearchKeys), [
    algoliaSearchKeys
  ]);

  const getRelatedArticles = useCallback(
    () => searchRelatedArticles(algoliaIndex, article),
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

  if (context === undefined)
    throw new Error("must be used within a AlgoliaSearchProvider");

  return context;
};

AlgoliaSearchProvider.propTypes = {
  algoliaSearchKeys: PropTypes.shape({
    applicationId: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
    indexName: PropTypes.string.isRequired
  }).isRequired,
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    section: PropTypes.string,
    topics: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  children: PropTypes.node.isRequired
};

export default AlgoliaSearchProvider;
