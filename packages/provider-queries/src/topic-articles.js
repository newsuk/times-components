import { addTypenameToDocument } from "apollo-utilities";
import topicArticles from "./topic_articles.graphql";

export default addTypenameToDocument(topicArticles);

export const propsToVariables = ({
  articleImageRatio = "3:2",
  page,
  pageSize,
  slug
}) => ({
  first: pageSize,
  imageRatio: articleImageRatio,
  skip: pageSize * (page - 1),
  slug
});
