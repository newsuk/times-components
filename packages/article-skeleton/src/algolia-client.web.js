import algoliasearch from "algoliasearch";

const initAlgoliaClient = async () => {
  try {
    const client = algoliasearch(
      process.env.ALGOLIA_ID,
      process.env.ALGOLIA_SEARCH_KEY
    );
    return await client.initIndex("prod_articles");
  } catch (error) {
    throw new Error(`There is an issue connecting to Algolia ${error}`);
  }
};

export default initAlgoliaClient;
