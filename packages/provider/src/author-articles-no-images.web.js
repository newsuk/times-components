import React from "react";
import AuthorArticlesNoImagesProvider from "./author-articles-no-images-base";

export default props => (
  <AuthorArticlesNoImagesProvider
    {...props}
    shortSummaryLength={220}
    longSummaryLength={360}
  />
);
