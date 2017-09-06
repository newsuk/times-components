import React from "react";
import PropTypes from "prop-types";
import { AuthorProfileProvider } from "@times-components/provider";
import AuthorProfileEmpty from "./author-profile-empty";
import AuthorProfileError from "./author-profile-error";
import AuthorProfileLoading from "./author-profile-loading";
import AuthorProfileContent from "./author-profile-content";

const AuthorProfileArticlesComponent = ({
  loading,
  error,
  author,
  ...props
}) => {
  if (loading) {
    return <AuthorProfileLoading />;
  }

  if (error) {
    return <AuthorProfileError {...error} />;
  }

  if (!!author === true) {
    const listProps = author.articles.list.map(article =>
      Object.assign({}, article, {
        ...article,
        publishedTime: new Date(article.publishedTime)
      })
    );

    return <AuthorProfileContent list={listProps} {...props} />;
  }

  return <AuthorProfileEmpty />;
};

AuthorProfileArticlesComponent.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.shape(),
  author: PropTypes.shape()
};

AuthorProfileArticlesComponent.defaultProps = {
  loading: false,
  error: null,
  author: null
};

const AuthorProfileArticles = props => (
  <AuthorProfileProvider {...props}>
    {AuthorProfileArticlesComponent}
  </AuthorProfileProvider>
);

export default AuthorProfileArticles;
