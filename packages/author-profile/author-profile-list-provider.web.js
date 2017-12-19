import React from "react";
import { AuthorArticlesNoImagesProvider } from "@times-components/provider";

export default props => (
  <AuthorArticlesNoImagesProvider
    {...props}
    shortSummaryLength={220}
    longSummaryLength={360}
  />
);
