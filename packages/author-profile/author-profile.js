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
    return <AuthorProfileContent {...props.data} />;
  }

  return <AuthorProfileEmpty />;
};

AuthorProfile.propTypes = {
  data: PropTypes.shape(AuthorProfileContent.propTypes),
  error: PropTypes.shape(),
  isLoading: PropTypes.bool
};

AuthorProfile.defaultProps = {
  data: null,
  error: null,
  isLoading: true
};

export default AuthorProfile;
