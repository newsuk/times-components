import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import Pagination from "@times-components/pagination";
import connect from "@times-components/provider";
import gql from "graphql-tag";

const query = gql`
  query Author($slug: Slug!) {
    author(slug: $slug) {
      articles {
        count
      }
    }
  }
`;

const propsToVariables = ({ slug, pageSize, page, imageRatio }) => ({
  slug,
  first: pageSize,
  skip: pageSize * (page - 1),
  imageRatio
});

const Query = connect(query, propsToVariables);

const Component = ({ error, loading, author, ...others }) => {
  if (author) {
    return <Pagination count={author.articles.count} {...others} />;
  }

  if (loading) {
    return <Pagination count={0} {...others} />;
  }

  if (error) {
    return <Text>error pagination</Text>;
  }

  return <Pagination count={0} {...others} />;
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

const AuthorProfileHeader = props => <Query {...props}>{Component}</Query>;
AuthorProfileHeader.propTypes = {
  slug: PropTypes.string.isRequired
};

export default AuthorProfileHeader;
