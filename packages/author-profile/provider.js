import get from "lodash.get";
import connectGraphql from "@times-components/provider";
import AuthorProfile from "./author-profile";
import query from "./query";

const propsToVariables = ({ slug, pageSize, page, imageRatio }) => ({
  slug,
  first: pageSize,
  skip: pageSize * (page - 1),
  imageRatio
});

const transformResponse = response => {
  const author = get(response, "data.author");
  if (author) {
    return {
      data: Object.assign(
        {},
        Object.assign({}, author, {
          articles: {
            count: author.articles.count,
            list: author.articles.list.map(article => ({
              ...article,
              publishedTime: new Date(article.publishedTime)
            }))
          }
        }),
        {
          count: get(response, "data.author.articles.count"),
          pageSize: 10,
          page: 1
        }
      ),
      error: null,
      isLoading: false
    };
  }

  return {
    error: get(response, "data.error", null),
    isLoading: get(response, "data.loading", true),
    data: null
  };
};

export default connectGraphql(query, propsToVariables, transformResponse)(
  AuthorProfile
);
