import React from "react";
import PropTypes from "prop-types";
import AuthorProfileContent from "./author-profile-content";
import AuthorProfileEmpty from "./author-profile-empty";
import AuthorProfileLoading from "./author-profile-loading";

const AuthorProfile = props => {
  if (props.isLoading) {
    return <AuthorProfileLoading />;
  }

  if (!props.data) {
    return <AuthorProfileEmpty />;
  }

  const contentProps = Object.assign({}, props.data, {
    page: props.page,
    pageSize: props.pageSize,
    imageRatio: props.imageRatio,
    count: props.data.articles && props.data.articles.count
  });

  return <AuthorProfileContent {...contentProps} />;
};

AuthorProfile.propTypes = {
  data: PropTypes.shape(AuthorProfileContent.propTypes),
  imageRatio: PropTypes.string,
  isLoading: PropTypes.boolean,
  page: PropTypes.number,
  pageSize: PropTypes.number
};

AuthorProfile.defaultProps = {
  data: null,
  imageRatio: "3:2",
  isLoading: true,
  page: 1,
  pageSize: 20
};

export default AuthorProfile;
