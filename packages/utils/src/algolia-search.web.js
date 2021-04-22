import React, { createContext, useMemo, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import algoliasearch from "algoliasearch";

const appId = "PZGYBTWG3J";
const apiKey = "572d633b038f582c813e45a798b94238";

const createAlgoliaIndex = () =>
  algoliasearch(appId, apiKey).initIndex("prod_articles");

const searchRelatedArticles = async index => {
  const search = await index.search("", { hitsPerPage: 5 });
  return search.hits;
};

const AlgoliaSearchContext = createContext();

const AlgoliaSearchProvider = ({ children }) => {
  const algoliaIndex = useMemo(() => createAlgoliaIndex(), []);

  const getRelatedArticles = useCallback(
    () => (algoliaIndex ? searchRelatedArticles(algoliaIndex) : null),
    [algoliaIndex]
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
  // active: PropTypes.bool,
  // headline: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

/* AlgoliaSearchProvider.defaultProps = {
  active: false
}; */

export default AlgoliaSearchProvider;
