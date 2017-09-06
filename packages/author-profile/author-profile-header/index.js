import PropTypes from "prop-types";
import React from "react";
import AuthorHead from "@times-components/author-head";
import Error from "../error";
import Loading from "./loading";
import Provider from "./provider";

const Component = ({ error, loading, author }) => {
  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  const props = {
    bio: author.biography,
    name: author.name,
    uri: author.image,
    title: author.jobTitle,
    twitter: author.twitter
  };

  return <AuthorHead {...props} />;
};

Component.defaultProps = {
  error: null,
  loading: false,
  author: null
};

Component.propTypes = {
  error: PropTypes.shape(),
  loading: PropTypes.bool,
  author: PropTypes.shape()
};

export default props => <Provider {...props}>{Component}</Provider>;
