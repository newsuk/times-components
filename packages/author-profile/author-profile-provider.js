import connectGraphql from "@times-components/provider";
import get from "lodash.get";
import query from "./author-profile-query";
import Component from "./author-profile-component";

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
            list: author.articles.list.map(article =>
              Object.assign({}, article, {
                publishedTime: new Date(article.publishedTime)
              })
            )
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
  Component
);
