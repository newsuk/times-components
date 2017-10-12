import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Pagination from "@times-components/pagination";

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    maxWidth: 800
  },
  spacing: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    maxWidth: 800
  }
});

const AuthorProfileFooter = ({
  count,
  page,
  generatePageLink,
  onNext,
  onPrev,
  pageSize
}) => (
  <View style={styles.container}>
    <View style={styles.spacing}>
      <Pagination
        page={page}
        pageSize={pageSize}
        count={count}
        hideResults
        generatePageLink={generatePageLink}
        onNext={onNext}
        onPrev={onPrev}
      />
    </View>
  </View>
);

AuthorProfileFooter.propTypes = {
  count: Pagination.propTypes.count,
  generatePageLink: Pagination.propTypes.generatePageLink,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  page: Pagination.propTypes.page,
  pageSize: Pagination.propTypes.pageSize
};

AuthorProfileFooter.defaultProps = {
  count: 0,
  page: 0,
  generatePageLink: page => `?page=${page}`,
  onNext: () => {},
  onPrev: () => {},
  pageSize: 20
};

export default AuthorProfileFooter;
