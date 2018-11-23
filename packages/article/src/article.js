import React from "react";
import ArticleMainStandard from "@times-components/article-main-standard";
import ArticleMainComment from "@times-components/article-main-comment";

export const templates = {
  indepth: "indepth",
  magazinecomment: "magazinecomment",
  magazinestandard: "magazinestandard",
  maincomment: "maincomment",
  mainstandard: "mainstandard"
};

const Article = props => {
  console.log(props.article);
  const { template } = props.article;
  switch (template) {
    case templates.mainstandard:
      return <ArticleMainStandard {...props} />;
    case templates.maincomment:
      return <ArticleMainComment {...props} />;
    default:
      return <ArticleMainStandard {...props} />;
  }
};

export default Article;
