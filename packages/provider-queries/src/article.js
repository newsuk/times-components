import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";
import articleFragment from "./article-fragment";

export default addTypenameToDocument(
  gql`
    query ArticleQuery($id: ID!) {
      article(id: $id) {
        ...articlePageProps
      }
    }

    ${articleFragment}
  `
);
