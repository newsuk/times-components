import connect from "./connect";
import AuthorProfileProvider, {
  query as authorProfileQuery
} from "./author-profile";
import AuthorArticlesNoImagesProvider, {
  query as articleListNoImagesQuery
} from "./author-articles-no-images";
import AuthorArticlesWithImagesProvider, {
  query as articleListWithImagesQuery
} from "./author-articles-with-images";
import ArticleProvider, { query as articleQuery } from "./article";

export default connect;

export {
  AuthorProfileProvider,
  AuthorArticlesNoImagesProvider,
  AuthorArticlesWithImagesProvider,
  ArticleProvider,
  articleQuery,
  authorProfileQuery,
  articleListNoImagesQuery,
  articleListWithImagesQuery
};
