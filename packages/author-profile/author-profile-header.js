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
  generatePageLink,
  onNext,
  onPrev,
  page,
  pageSize,
  slug
}) => {
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
      <AuthorHead slug={slug} />
      <View style={styles.container}>
        <View style={styles.spacing}>
          <Pagination {...paginationProps} />
        </View>
      </View>
    </View>
  );
};

AuthorProfileHeader.propTypes = {
  count: Pagination.propTypes.count,
  generatePageLink: Pagination.propTypes.generatePageLink,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  page: Pagination.propTypes.page,
  pageSize: Pagination.propTypes.pageSize,
  slug: PropTypes.string.isRequired
};

AuthorProfileHeader.defaultProps = {
  count: 0,
  page: 0,
  generatePageLink: page => `?page=${page}`,
  onNext: () => {},
  onPrev: () => {},
  pageSize: 20
};

export default AuthorProfileHeader;
