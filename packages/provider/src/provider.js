import connect from "./connect";
import AuthorProfileProvider from "./author-profile";
import AuthorArticlesNoImagesProvider from "./author-articles-no-images";
import AuthorArticlesWithImagesProvider from "./author-articles-with-images";
import ArticleProvider, { query as articleQuery } from "./article";

export default connect;

export { default as fixtureGenerator } from "./fixture-generator";

export {
  AuthorProfileProvider,
  AuthorArticlesNoImagesProvider,
  AuthorArticlesWithImagesProvider,
  ArticleProvider,
  articleQuery
};
