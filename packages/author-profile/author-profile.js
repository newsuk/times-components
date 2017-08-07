import React from "react";
import PropTypes from "prop-types";
import AuthorProfileContent from "./author-profile-content";
import AuthorProfileEmpty from "./author-profile-empty";
import AuthorProfileLoading from "./author-profile-loading";

const AuthorProfile = props => {
  if (props.isLoading) {
    return <AuthorProfileLoading />;
  }

  if (!!props.data === true) {
    return <AuthorProfileContent {...props.data} />;
  }

  return <AuthorProfileEmpty />;
};

AuthorProfile.propTypes = {
  data: PropTypes.shape(AuthorProfileContent.propTypes),
  isLoading: PropTypes.bool
};

AuthorProfile.defaultProps = {
  data: null,
  imageRatio: "3:2",
  isLoading: true,
  page: 1,
  pageSize: 20
};

export default AuthorProfile;
