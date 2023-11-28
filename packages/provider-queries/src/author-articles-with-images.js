import { addTypenameToDocument } from "apollo-utilities";
import authorArticlesWithImages from "./author_articles_with_images.graphql";

export default addTypenameToDocument(authorArticlesWithImages);

export const propsToVariables = ({
  slug,
  pageSize,
  page,
  articleImageRatio = "3:2"
}) => ({
  first: pageSize,
  imageRatio: articleImageRatio,
  skip: pageSize * (page - 1),
  slug
});
