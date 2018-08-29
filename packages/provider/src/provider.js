import connect from "./connect";
import ArticleProvider from "./article";
import AuthorProfileProvider from "./author-profile";
import AuthorArticlesNoImagesProvider from "./author-articles-no-images";
import AuthorArticlesWithImagesProvider from "./author-articles-with-images";
import NativeArticleProvider from "./article-from-native";
import TopicProvider from "./topic";
import TopicArticlesProvider from "./topic-articles";

export default connect;

export {
  ArticleProvider,
  AuthorProfileProvider,
  AuthorArticlesNoImagesProvider,
  AuthorArticlesWithImagesProvider,
  NativeArticleProvider,
  TopicProvider,
  TopicArticlesProvider
};
