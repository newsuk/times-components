import React from "react";
import ArticleHeaderBase from "./article-header.base";

import {
  HeadlineContainer,
  LabelContainer
} from "../styles/article-header/responsive";

const ArticleHeader = props => (
  <ArticleHeaderBase
    {...props}
    HeadlineWrapper={HeadlineContainer}
    LabelWrapper={LabelContainer}
  />
);

export default ArticleHeader;
