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
  image: uri,
  jobTitle: title,
  name,
  onNext,
  onPrev,
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
    count,
    onNext,
    onPrev,
    nextPageLinking: "https://www.thetimes.co.uk?page=3",
    page,
    pageSize,
    prevPageLinking: "https://www.thetimes.co.uk?page=1"
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
  jobTitle: AuthorHead.propTypes.title,
  name: AuthorHead.propTypes.name,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  page: Pagination.propTypes.page,
  pageSize: Pagination.propTypes.pageSize,
  twitter: AuthorHead.propTypes.twitter
};

AuthorProfileHeader.defaultProps = {
  count: 0,
  biography: null,
  page: 0,
  image: null,
  jobTitle: null,
  name: null,
  onNext: () => {},
  onPrev: () => {},
  pageSize: 20,
  twitter: null
};

export default AuthorProfileHeader;
