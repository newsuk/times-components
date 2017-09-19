import AuthorHead from "@times-components/author-head";
import { AuthorHeadProvider } from "@times-components/provider";
import PropTypes from "prop-types";
import React from "react";
import { Text } from "react-native";
import Loading from "./loading";

const Component = ({ error, loading, author }) => {
  if (error) {
    return <Text>{JSON.stringify(error, null, 2)}</Text>;
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
  author: null
};

Component.propTypes = {
  error: PropTypes.shape(),
  loading: PropTypes.bool.isRequired,
  author: PropTypes.shape()
};

export default props => (
  <AuthorHeadProvider {...props}>{Component}</AuthorHeadProvider>
);
