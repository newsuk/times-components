import connect from "./connect";
import AuthorProfileProvider from "./author-profile";
import AuthorArticlesNoImagesProvider from "./author-articles-no-images";
import AuthorArticlesWithImagesProvider from "./author-articles-with-images";
import ArticleProvider from "./article";
import TopicProvider from "./topic";
import TopicArticlesProvider from "./topic-articles";

export default connect;

export {
  AuthorProfileProvider,
  AuthorArticlesNoImagesProvider,
  AuthorArticlesWithImagesProvider,
  ArticleProvider,
  TopicProvider,
  TopicArticlesProvider
};
