import gql from "graphql-tag";
import {
  authorArticlesWithImages,
  authorArticlesWithImagesPTV
} from "@times-components/provider-queries";
import connectGraphql from "./connect";

export default connectGraphql(
  gql(authorArticlesWithImages),
  authorArticlesWithImagesPTV
);
