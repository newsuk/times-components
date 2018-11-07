import articleQuery from "./article";
import articleCommentsQuery from "./article-comments";
import * as authorArticlesNoImagesQuery from "./author-articles-no-images";
import * as authorArticlesWithImagesQuery from "./author-articles-with-images";
import authorQuery from "./author";
import topicQuery from "./topic";
import * as topicArticlesQuery from "./topic-articles";

export const article = articleQuery;
export const articleComments = articleCommentsQuery;
export const authorArticlesNoImages = authorArticlesNoImagesQuery.default;
export const authorArticlesNoImagesPTV =
  authorArticlesNoImagesQuery.propsToVariables;
export const authorArticlesWithImages = authorArticlesWithImagesQuery.default;
export const authorArticlesWithImagesPTV =
  authorArticlesWithImagesQuery.propsToVariables;
export const author = authorQuery;
export const topic = topicQuery;
export const topicArticles = topicArticlesQuery.default;
export const topicArticlesPTV = topicArticlesQuery.propsToVariables;
