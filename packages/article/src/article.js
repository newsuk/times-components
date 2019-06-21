import React from "react";
import ArticleMagazineComment from "@times-components/article-magazine-comment";
import ArticleInDepth from "@times-components/article-in-depth";
import ArticleMagazineStandard from "@times-components/article-magazine-standard";
import ArticleMainStandard from "@times-components/article-main-standard";
import ArticleMainComment from "@times-components/article-main-comment";
import Responsive from "@times-components/responsive";
import { scales } from "@times-components/styleguide";
import { MessageManager } from "@times-components/message-bar";
import { getMediaList, addIndexesToInlineImages } from "./utils";

export const templates = {
  indepth: ArticleInDepth,
  magazinecomment: ArticleMagazineComment,
  magazinestandard: ArticleMagazineStandard,
  maincomment: ArticleMainComment,
  mainstandard: ArticleMainStandard
};

export class TakeoverBailout extends Error {
  constructor(message) {
    super(message);
    this.name = "TakeoverBailout";
  }
}

const Article = props => {
  const { article, onImagePress } = props;
  const { leadAsset, template = "mainstandard" } = article || {};
  let { content } = article || {};

  if (template === "takeoverPage") {
    throw new TakeoverBailout("Aborted react render: Takeover page");
  }

  let onImagePressArticle = null;

  if (onImagePress) {
    content = addIndexesToInlineImages(content, leadAsset);
    const mediaList = getMediaList(content, leadAsset);
    onImagePressArticle = index => onImagePress(index, mediaList);
  }

  const Component = templates[template] || ArticleMainStandard;

  return (
    <Responsive>
      <MessageManager animate delay={3000} scale={scales.medium}>
        <Component {...props} onImagePress={onImagePressArticle} />
      </MessageManager>
    </Responsive>
  );
};

export default Article;
