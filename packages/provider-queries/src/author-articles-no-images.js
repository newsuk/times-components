import { addTypenameToDocument } from "apollo-utilities";
import authorArticlesNoImagesQuery from "./author_articles_no_images.graphql";

export default addTypenameToDocument(authorArticlesNoImagesQuery);

export const propsToVariables = ({
  longSummaryLength,
  pageSize,
  page,
  shortSummaryLength,
  slug
}) => ({
  first: pageSize,
  longSummaryLength,
  shortSummaryLength,
  skip: pageSize * (page - 1),
  slug
});
