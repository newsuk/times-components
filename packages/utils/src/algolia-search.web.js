import React, { createContext, useMemo, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import algoliasearch from "algoliasearch";

import searchRelatedArticles from "./algolia-related-articles.web";

const applicationId = "PZGYBTWG3J";
const apiKey = "572d633b038f582c813e45a798b94238";
const indexName = "prod_articles_by_published_date_desc";

const createAlgoliaIndex = () =>
  algoliasearch(applicationId, apiKey).initIndex(indexName);

const AlgoliaSearchContext = createContext();

const AlgoliaSearchProvider = ({ article, children }) => {
  const algoliaIndex = useMemo(() => createAlgoliaIndex(), []);

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
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    section: PropTypes.string,
    topics: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  children: PropTypes.node.isRequired
};

export default AlgoliaSearchProvider;
