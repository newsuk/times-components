import get from "lodash.get";
import gql from "graphql-tag";
import Article from "@times-components/article";
import connectGraphql from "./connect";

const query = gql`
  query ArticleDataQuery($id: ID!) {
    article(id: $id) {
      id
      title
      publicationName
      publishedTime
      label
      standfirst
      flags
      byline
      content
      leadAsset {
        ... on Image {
          id
          title
          credits
          caption
          crop(ratio: "16:9") {
            ratio
            url
          }
        }
      }
    }
  }
`;

const propsToVariables = id => id;

const transformResponse = response => {
  const article = get(response, "data.article");

  if (article) {
    return {
      data: { article },
      error: null,
      isLoading: false
    };
  }

  return {
    error: get(response, "data.error", null),
    isLoading: get(response, "data.loading", true),
    data: null
  };
};

export default connectGraphql(query, propsToVariables, transformResponse)(
  Article
);
