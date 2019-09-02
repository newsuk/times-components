import connect, { QueryProvider } from "./connect";
import AuthorProfileProvider from "./author-profile";
import AuthorArticlesNoImagesProvider from "./author-articles-no-images";
import AuthorArticlesWithImagesProvider from "./author-articles-with-images";
import ArticleProvider from "./article";
import ArticleExtrasProvider from "./article-extras";
import EditionProvider from "./edition";
import TopicProvider from "./topic";
import TopicArticlesProvider from "./topic-articles";
import Bookmarks from "./bookmarks";

export default connect;

export {
  AuthorProfileProvider,
  AuthorArticlesNoImagesProvider,
  AuthorArticlesWithImagesProvider,
  ArticleProvider,
  ArticleExtrasProvider,
  EditionProvider,
  TopicProvider,
  TopicArticlesProvider,
  QueryProvider,
  Bookmarks
};
