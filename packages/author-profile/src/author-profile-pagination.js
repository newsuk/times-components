import React from "react";
import { StyleSheet, View } from "react-native";
import Pagination from "@times-components/pagination";
import { spacing } from "@times-components/styleguide";

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "center"
  },
  itemContainer: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  },
  spacing: {
    flex: 1,
    maxWidth: 800
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
