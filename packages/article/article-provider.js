import connectGraphql from "@times-components/provider";
import gql from "graphql-tag";
import Article from "./article.web";

const query = gql`
    query ArticleDataQuery($id: ID!) {
        article(id: $id) {
            id
            title
            publicationName
            publishedTime
            leadAsset{
             ... on Image
                {
                  id
                  title
                  crop(ratio: "16:9")
                  {
                   ratio
                    url
                  }
                }
            }
        }
    }`;

const propsToVariables = id => id;

export default connectGraphql(query, propsToVariables)(Article);
