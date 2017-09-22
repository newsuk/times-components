import get from "lodash.get";
import React from "react";
import PropTypes from "prop-types";
import { AuthorProfileProvider } from "@times-components/provider";
import { withPageState } from "@times-components/pagination";

const AuthorProfileWithPageState = withPageState(AuthorProfileProvider);

const AuthorProfileComponent = ({ author, children, ...props }) => {
  if (!author) {
    return children(props);
  }

  const result = {
    ...author,
    articles: {
      ...author.articles,
      list: get(author, "articles.list", []).map(article => ({
        ...article,
        publishedTime: new Date(article.publishedTime)
      }))
    },
    count: get(author, "articles.count")
  };

  return children({
    ...props,
    result
  });
};

AuthorProfileComponent.propTypes = {
  author: PropTypes.shape()
};

AuthorProfileComponent.defaultProps = {
  author: null
};

export default props => (
  <AuthorProfileWithPageState {...props}>
    {AuthorProfileComponent}
  </AuthorProfileWithPageState>
);
