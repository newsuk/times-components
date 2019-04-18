import articleQuery from "./article";
import articleExtrasQuery from "./article-extras";
import * as authorArticlesNoImagesQuery from "./author-articles-no-images";
import * as authorArticlesWithImagesQuery from "./author-articles-with-images";
import authorQuery from "./author";
import editionQuery from "./edition";
import getBookmarksQuery from "./getBookmarks";
import nativeEditionQuery from "./native-edition";
import saveBookmarksQuery from "./save-bookmark";
import topicQuery from "./topic";
import * as topicArticlesQuery from "./topic-articles";
import unsaveBookmarksQuery from "./unsave-bookmark";

export const article = articleQuery;
export const articleExtras = articleExtrasQuery;
export const authorArticlesNoImages = authorArticlesNoImagesQuery.default;
export const authorArticlesNoImagesPTV =
  authorArticlesNoImagesQuery.propsToVariables;
export const authorArticlesWithImages = authorArticlesWithImagesQuery.default;
export const authorArticlesWithImagesPTV =
  authorArticlesWithImagesQuery.propsToVariables;
export const author = authorQuery;
export const edition = editionQuery;
export const getBookmarks = getBookmarksQuery;
export const nativeEdition = nativeEditionQuery;
export const saveBookmarks = saveBookmarksQuery;
export const topic = topicQuery;
export const topicArticles = topicArticlesQuery.default;
export const topicArticlesPTV = topicArticlesQuery.propsToVariables;
export const unsaveBookmarks = unsaveBookmarksQuery;
