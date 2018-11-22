import React from "react";
import ArticleMainStandard from "@times-components/article-main-standard";
import ArticleMainComment from "@times-components/article-main-comment";

export const MAIN_STANDARD = "mainstandard";
export const MAIN_COMMENT = "maincomment";
export const MAGAZINE_STANDARD = "magazinestandard";
export const MAGAZINE_COMMENT = "magazinecomment";
export const IN_DEPTH = "indepth";

const ArticleTemplate = props => {
  const { template } = props.article;
  switch (template) {
    case MAIN_STANDARD:
      return <ArticleMainStandard {...props} />;
    case MAIN_COMMENT:
      return <ArticleMainComment {...props} />;
    default:
      return <ArticleMainStandard {...props} />;
  }
};

export default ArticleTemplate;
