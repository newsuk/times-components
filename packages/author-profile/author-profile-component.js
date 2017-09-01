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
      pageSize: props.pageSize
    };
    return <AuthorProfileContent {...props.data} {...extra} />;
  }

  return <AuthorProfileEmpty />;
};

AuthorProfile.propTypes = {
  data: PropTypes.shape(AuthorProfileContent.propTypes),
  error: PropTypes.shape(),
  isLoading: PropTypes.bool,
  onNext: AuthorProfileContent.propTypes.onNext,
  onPrev: AuthorProfileContent.propTypes.onPrev,
  page: AuthorProfileContent.propTypes.page,
  pageSize: AuthorProfileContent.propTypes.pageSize
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
