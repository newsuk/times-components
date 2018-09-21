import React from "react";
import {
  authorArticlesNoImages,
  authorArticlesNoImagesPTV
} from "@times-components/provider-queries";
import connectGraphql from "./connect";

const AuthorArticlesNoImagesProvider = connectGraphql(
  authorArticlesNoImages,
  authorArticlesNoImagesPTV
);

export default props => (
  <AuthorArticlesNoImagesProvider
    {...props}
    longSummaryLength={360}
    shortSummaryLength={220}
  />
);
