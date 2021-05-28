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

const OPTIMIZELY_TOTAL_SEARCHES = "related-articles_algolia-results-count";
const OPTIMIZELY_NO_RESULT = "related-articles_algolia-no-result";

const fireOpitmizelyEvent = (eventName, value = 1) => {
  if (typeof window !== "undefined") {
    window.optimizely = window.optimizely || [];
    window.optimizely.push({
      type: "event",
      eventName,
      tags: {
        value
      }
    });
  }
};

const AlgoliaSearchContext = createContext();

const AlgoliaSearchProvider = ({ algoliaSearchKeys, article, children }) => {
  const algoliaIndex = useMemo(() => createAlgoliaIndex(algoliaSearchKeys), [
    algoliaSearchKeys
  ]);

  const getRelatedArticles = useCallback(
    async () => {
      const results = await searchRelatedArticles(algoliaIndex, article);
      fireOpitmizelyEvent(OPTIMIZELY_TOTAL_SEARCHES);
      if (results === null) {
        fireOpitmizelyEvent(OPTIMIZELY_NO_RESULT);
      }
      return results;
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

  if (context === undefined)
    throw new Error("must be used within an AlgoliaSearchProvider");

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
