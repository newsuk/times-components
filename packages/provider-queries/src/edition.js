import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";
import sectionFragment from "./section-fragment";

export default addTypenameToDocument(
  gql`
    query EditionQuery($id: ID!) {
      edition(id: $id) {
        id
        publishedTime
        updateText
        sections {
          id
          title
          ...sectionPageProps
        }
      }
    }

    ${sectionFragment}
  `
);
