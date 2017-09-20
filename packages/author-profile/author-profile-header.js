import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import AuthorHead from "@times-components/author-head";
import Pagination from "@times-components/pagination";

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "center"
  },
  spacing: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    maxWidth: 800
  }
});

const AuthorProfileHeader = ({
  count,
  biography: bio,
  page,
  generatePageLink,
  image: uri,
  jobTitle: title,
  name,
  onNext,
  onPrev,
  pageSize,
  twitter,
  onTwitterLinkPress
}) => {
  const authorProps = {
    bio,
    name,
    uri,
    title,
    twitter,
    onTwitterLinkPress
  };

  const paginationProps = {
    count,
    generatePageLink,
    onNext,
    onPrev,
    page,
    pageSize
  };

  return (
    <View>
      <AuthorHead {...authorProps} />
      <View style={styles.container}>
        <View style={styles.spacing}>
          <Pagination {...paginationProps} />
        </View>
      </View>
    </View>
  );
};

AuthorProfileHeader.propTypes = {
  biography: AuthorHead.propTypes.bio,
  count: Pagination.propTypes.count,
  image: AuthorHead.propTypes.uri,
  generatePageLink: Pagination.propTypes.generatePageLink,
  jobTitle: AuthorHead.propTypes.title,
  name: AuthorHead.propTypes.name,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  page: Pagination.propTypes.page,
  pageSize: Pagination.propTypes.pageSize,
  twitter: AuthorHead.propTypes.twitter,
  onTwitterLinkPress: PropTypes.func.isRequired
};

AuthorProfileHeader.defaultProps = {
  count: 0,
  biography: null,
  page: 0,
  generatePageLink: page => `?page=${page}`,
  image: null,
  jobTitle: null,
  name: null,
  onNext: () => {},
  onPrev: () => {},
  pageSize: 20,
  twitter: null
};

export default AuthorProfileHeader;
