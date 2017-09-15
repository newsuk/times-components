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
    return <Pagination {...others} count={author.articles.count} />;
  }

  if (loading) {
    return <Pagination {...others} count={0} />;
  }

  if (error) {
    return <Text>error pagination</Text>;
  }

  return <Pagination count={0} {...others} />;
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

const AuthorProfilePagination = props => <Query {...props}>{Component}</Query>;

AuthorProfilePagination.propTypes = {
  slug: PropTypes.string.isRequired
};

export default AuthorProfilePagination;
