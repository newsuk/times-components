import React from "react";
import PropTypes from "prop-types";
import get from "lodash.get";
import AuthorProfileContent from "./author-profile-content";
import AuthorProfileEmpty from "./author-profile-empty";
import AuthorProfileError from "./author-profile-error";
import AuthorProfileLoading from "./author-profile-loading";

const AuthorProfile = ({
  isLoading,
  error,
  author,
  page,
  pageSize,
  onTwitterLinkPress,
  onArticlePress,
  onNext,
  onPrev
}) => {
  if (error) {
    return <AuthorProfileError {...error} />;
  }

  if (isLoading) {
    return <AuthorProfileLoading />;
  }

  if (author) {
    const data = {
      ...author,
      articles: {
        ...author.articles,
        list: get(author, "articles.list", []).map(article => ({
          ...article,
          publishedTime: new Date(article.publishedTime)
        }))
      },
      count: get(author, "articles.count"),
      page,
      pageSize
    };

    return (
      <AuthorProfileContent
        {...data}
        onTwitterLinkPress={onTwitterLinkPress}
        onArticlePress={onArticlePress}
        onNext={onNext}
        onPrev={onPrev}
      />
    );
  }

  return <AuthorProfileEmpty />;
};

const {
  onNext,
  onPrev,
  page,
  pageSize,
  onTwitterLinkPress,
  onArticlePress,
  ...author
} = AuthorProfileContent.propTypes;

AuthorProfile.propTypes = {
  author: PropTypes.shape(author),
  error: PropTypes.shape(),
  isLoading: PropTypes.bool,
  onNext,
  onPrev,
  page,
  pageSize,
  // eslint doesnt follow the reference. AuthorProfileContent.propTypes.onTwitterLinkPress is actually marked as required.
  // eslint-disable-next-line react/require-default-props
  onTwitterLinkPress,
  // eslint-disable-next-line react/require-default-props
  onArticlePress
};

AuthorProfile.defaultProps = {
  author: null,
  error: null,
  isLoading: true,
  onNext: () => {},
  onPrev: () => {},
  page: 1,
  pageSize: 10
};

export default AuthorProfile;
