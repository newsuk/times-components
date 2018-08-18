import gql from "graphql-tag";
import React from "react";
import {
  authorArticlesNoImages,
  authorArticlesNoImagesPTV
} from "@times-components/provider-queries";
import connectGraphql from "./connect";

const AuthorArticlesNoImagesProvider = connectGraphql(
  gql(authorArticlesNoImages),
  authorArticlesNoImagesPTV
);

export default props => (
  <AuthorArticlesNoImagesProvider
    {...props}
    longSummaryLength={220}
    shortSummaryLength={220}
  />
);
