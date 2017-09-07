import get from "lodash.get";
import React from "react";
import PropTypes from "prop-types";
import { AuthorProfileProvider } from "@times-components/provider";
import { withPageState } from "@times-components/pagination";
import AuthorProfile from "./author-profile";

const AuthorProfileWithPageState = withPageState(AuthorProfileProvider);

const AuthorProfileComponent = ({ error, loading, result, ...extras }) => {
  if (result.author) {
    const author = Object.assign(
      {},
      Object.assign({}, result.author, {
        articles: {
          count: get(result, "author.articles.count", 0),
          list: get(result, "author.articles.list", []).map(article => ({
            ...article,
            publishedTime: new Date(article.publishedTime)
          }))
        }
      }),
      {
        count: get(result, "author.articles.count")
      }
    );

    return (
      <AuthorProfile
        error={error}
        loading={loading}
        data={author}
        {...extras}
      />
    );
  }

  return <AuthorProfile error={error} loading={loading} {...extras} />;
};

AuthorProfileComponent.propTypes = {
  error: PropTypes.shape(),
  loading: PropTypes.bool,
  result: PropTypes.shape()
};

AuthorProfileComponent.defaultProps = {
  error: null,
  loading: true,
  result: null
};

export default props => (
  <AuthorProfileWithPageState {...props}>
    {AuthorProfileComponent}
  </AuthorProfileWithPageState>
);
