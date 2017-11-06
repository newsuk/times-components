import React from "react";
import { StyleSheet, View } from "react-native";
import Pagination from "@times-components/pagination";

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "center"
  },
  itemContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  spacing: {
    flex: 1,
    maxWidth: 800,
    paddingLeft: 10,
    paddingRight: 10
  }
});

const AuthorProfilePagination = props => (
  <View style={styles.container}>
    <View style={styles.spacing}>
      <Pagination {...props} generatePageLink={pageNum => `?page=${pageNum}`} />
    </View>
  </View>
);

AuthorProfilePagination.propTypes = Pagination.propTypes;
export default AuthorProfilePagination;
