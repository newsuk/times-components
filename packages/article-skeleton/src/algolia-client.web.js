import algoliasearch from "algoliasearch";

const initAlgoliaClient = async () => {
  try {
    const client = algoliasearch(
      "PZGYBTWG3J",
      "572d633b038f582c813e45a798b94238"
    );
    return await client.initIndex("prod_articles");
  } catch (error) {
    throw new Error(`There is an issue connecting to Algolia ${error}`);
  }
};

export default initAlgoliaClient;
