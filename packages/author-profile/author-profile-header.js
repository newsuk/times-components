import React from "react";
import { StyleSheet, View } from "react-native";
import AuthorHead from "@times-components/author-head";
import Pagination from "@times-components/pagination";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    display: "flex",
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
  articleCount: count,
  biography: bio,
  currentPageOffset,
  image: uri,
  jobTitle: title,
  name,
  pageSize,
  twitter
}) => {
  const authorProps = {
    bio,
    name,
    uri,
    title,
    twitter
  };

  const paginationProps = {
    page: currentPageOffset + 1,
    pageSize,
    count
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
  articleCount: Pagination.propTypes.count,
  biography: AuthorHead.propTypes.bio,
  currentPageOffset: PropTypes.number,
  image: AuthorHead.propTypes.uri,
  jobTitle: AuthorHead.propTypes.title,
  name: AuthorHead.propTypes.name,
  twitter: AuthorHead.propTypes.twitter,
  pageSize: Pagination.propTypes.pageSize
};

AuthorProfileHeader.defaultProps = {
  articleCount: 0,
  biography: null,
  currentPageOffset: 0,
  image: null,
  jobTitle: null,
  name: null,
  twitter: null,
  pageSize: 20
};

export default AuthorProfileHeader;
