import React from "react";
import PropTypes from "prop-types";
import AuthorHead from "./author-head";
import AuthorHeadEmpty from "./author-head-empty";
import AuthorHeadError from "./author-head-error";
import AuthorHeadLoading from "./author-head-loading";

const AuthorHeadComponent = props => {
  if (props.isLoading) {
    return <AuthorHeadLoading />;
  }

  if (props.error) {
    return <AuthorHeadError {...props.error} />;
  }

  if (!!props.data === true) {
    return <AuthorHead {...props.data} />;
  }

  return <AuthorHeadEmpty />;
};

AuthorHeadComponent.propTypes = {
  data: PropTypes.shape(AuthorHead.propTypes),
  error: PropTypes.shape(),
  isLoading: PropTypes.bool
};

AuthorHeadComponent.defaultProps = {
  data: null,
  error: null,
  isLoading: true
};

export default AuthorHeadComponent;
