import connectGraphql from "@times-components/provider";
import gql from "graphql-tag";
import Article from "./article";

const query = gql`
    query ArticleDataQuery($id: ID!) {
        article(id: $id) {
            id
            title
            publicationName
            publishedTime
            label
            byline
            content
            leadAsset{
             ... on Image
                {
                  id
                  title
                  credits
                  caption
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
