import React, { useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

import initAlgoliaClient from "./algolia-client";

const AlgoliaSearchContext = React.createContext({});

const AlgoliaSearchProvider = ({ headline, children }) => {
  const [client, setClient] = useState();

  const [relatedArticles, setRelatedArticles] = useState();

  useMemo(async () => {
    const algolia = await initAlgoliaClient();
    setClient(algolia);
  }, []);

  useMemo(
    async () => {
      if (client) {
        const search = await client.search(headline, { hitsPerPage: 5 });
        setRelatedArticles(search.hits);
      }
    },
    [client]
  );

  return (
    <AlgoliaSearchContext.Provider value={{ relatedArticles }}>
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
  headline: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default AlgoliaSearchProvider;
