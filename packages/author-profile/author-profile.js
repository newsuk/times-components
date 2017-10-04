import React from "react";
import PropTypes from "prop-types";
import AuthorProfileContent from "./author-profile-content";
import AuthorProfileEmpty from "./author-profile-empty";
import AuthorProfileError from "./author-profile-error";
import AuthorProfileLoading from "./author-profile-loading";

const AuthorProfile = props => {
  if (props.isLoading) {
    return <AuthorProfileLoading />;
  }

  if (props.error) {
    return <AuthorProfileError {...props.error} />;
  }

  if (!!props.data === true) {
    const extra = {
      onNext: props.onNext,
      onPrev: props.onPrev,
      page: props.page,
      pageSize: props.pageSize,
      onTwitterLinkPress: props.onTwitterLinkPress,
      onArticlePress: props.onArticlePress
    };
    return <AuthorProfileContent {...props.data} {...extra} />;
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
  ...data
} = AuthorProfileContent.propTypes;

AuthorProfile.propTypes = {
  data: PropTypes.shape(data),
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
  data: null,
  error: null,
  isLoading: true,
  onNext: () => {},
  onPrev: () => {},
  page: 1,
  pageSize: 10
};

export default AuthorProfile;
