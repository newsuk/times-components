import React from "react";
import ArticleMagazineComment from "@times-components/article-magazine-comment";
import ArticleInDepth from "@times-components/article-in-depth";
import ArticleMagazineStandard from "@times-components/article-magazine-standard";
import ArticleMainStandard from "@times-components/article-main-standard";
import ArticleMainComment from "@times-components/article-main-comment";
import { getMediaList, addIndexesToInlineImages } from "./utils";

export const templates = {
  indepth: ArticleInDepth,
  magazinecomment: ArticleMagazineComment,
  magazinestandard: ArticleMagazineStandard,
  maincomment: ArticleMainComment,
  mainstandard: ArticleMainStandard
};

const Article = props => {
  const { article, onImagePress } = props;
  const { leadAsset, template = "mainstandard" } = article || {};
  let { content } = article || {};

  let onImagePressArticle = null;

  if (onImagePress) {
    content = addIndexesToInlineImages(content, leadAsset);
    const mediaList = getMediaList(content, leadAsset);
    onImagePressArticle = index => onImagePress(index, mediaList);
  }

  const Component = templates[template] || ArticleMainStandard;
  return <Component {...props} onImagePress={onImagePressArticle} />;
};

export default Article;
