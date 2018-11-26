import React from "react";
import ArticleMainStandard from "@times-components/article-main-standard";
import ArticleMainComment from "@times-components/article-main-comment";

const templates = {
  maincomment: ArticleMainComment,
  mainstandard: ArticleMainStandard
};

const Article = props => {
  const {
    article: { template = "mainstandard" }
  } = props;

  const Component = templates[template];
  return <Component {...props} />;
};

export default Article;
