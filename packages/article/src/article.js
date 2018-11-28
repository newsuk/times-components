import React from "react";
import ArticleMagazineComment from "@times-components/article-magazine-comment";
import ArticleMainStandard from "@times-components/article-main-standard";
import ArticleMainComment from "@times-components/article-main-comment";

export const templates = {
  magazinecomment: ArticleMagazineComment,
  maincomment: ArticleMainComment,
  mainstandard: ArticleMainStandard
};

const Article = props => {
  const { article } = props;
  const { template = "mainstandard" } = article || {};

  const Component = templates[template];
  return <Component {...props} />;
};

export default Article;
