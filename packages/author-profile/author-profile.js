import React from "react";
import PropTypes from "prop-types";
import AuthorProfileContent from "./author-profile-content";
import AuthorProfileEmpty from "./author-profile-empty";
import AuthorProfileError from "./author-profile-error";
import AuthorProfileLoading from "./author-profile-loading";

const AuthorProfile = ({ loading, error, result, ...props }) => {
  if (loading) {
    return <AuthorProfileLoading />;
  }

  if (error) {
    return <AuthorProfileError {...error} />;
  }

  if (!!props.result === true) {
    const extra = {
      onNext: props.onNext,
      onPrev: props.onPrev,
      page: props.page,
      pageSize: props.pageSize,
      onTwitterLinkPress: props.onTwitterLinkPress
    };
    return <AuthorProfileContent {...props.result} {...extra} />;
  }

  return <AuthorProfileEmpty />;
};

const {
  onNext,
  onPrev,
  page,
  pageSize,
  onTwitterLinkPress,
  ...data
} = AuthorProfileContent.propTypes;

AuthorProfile.propTypes = {
  result: PropTypes.shape(data),
  error: PropTypes.shape(),
  loading: PropTypes.bool,
  onNext,
  onPrev,
  page,
  pageSize,
  // eslint doesnt follow the reference. AuthorProfileContent.propTypes.onTwitterLinkPress is actually marked as required.
  // eslint-disable-next-line react/require-default-props
  onTwitterLinkPress
};

AuthorProfile.defaultProps = {
  result: null,
  error: null,
  loading: true,
  onNext: () => {},
  onPrev: () => {},
  page: 1,
  pageSize: 10
};

export default AuthorProfile;
