import React from "react";
import PropTypes from "prop-types";
import AuthorProfileContent from "./author-profile-content";
import AuthorProfileEmpty from "./author-profile-empty";
import AuthorProfileLoading from "./author-profile-loading";

const AuthorProfile = props => {
  if (props.data.loading) {
    return <AuthorProfileLoading />;
  }

  if (!props.data || !props.data.author) {
    return <AuthorProfileEmpty />;
  }

  const contentProps = Object.assign({}, props.data.author, {
    page: props.page,
    pageSize: props.pageSize,
    imageRatio: props.imageRatio,
    count: props.data.author.articles && props.data.author.articles.count
  });

  return <AuthorProfileContent {...contentProps} />;
};

AuthorProfile.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.boolean,
    author: PropTypes.shape(AuthorProfileContent.propTypes)
  }),
  page: PropTypes.number,
  pageSize: PropTypes.number,
  imageRatio: PropTypes.string
};

AuthorProfile.defaultProps = {
  data: {
    loading: true,
    author: null
  },
  page: 1,
  pageSize: 20,
  imageRatio: "3:2"
};

export default AuthorProfile;
