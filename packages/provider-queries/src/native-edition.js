import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";
import articleFragment from "./article-fragment";
import sectionFragment from "./section-fragment";

export default addTypenameToDocument(
  gql`
    query EditionQuery($id: ID!) {
      edition(id: $id) {
        id
        sections: sections {
          id
          title
          ...sectionPageProps
        }
        nativeSections: sections {
          id
          ... on StandardSection {
            id
            title
            slices {
              ... on ArticleSlice {
                items {
                  articles: article {
                    id
                    ...articlePageProps
                  }
                  nativeArticles: article {
                    id
                    headline
                    url
                  }
                }
              }
            }
          }
        }
      }
    }

    ${articleFragment}
    ${sectionFragment}
  `
);
