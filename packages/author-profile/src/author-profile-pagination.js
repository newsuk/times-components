import React from "react";
import { View } from "react-native";
import Pagination from "@times-components/pagination";
import styles from "./styles";

const AuthorProfilePagination = props => (
  <View style={styles.paginationContainer}>
    <View style={styles.paginationSpacing}>
      <Pagination {...props} generatePageLink={pageNum => `?page=${pageNum}`} />
    </View>
  </View>
);

AuthorProfilePagination.propTypes = Pagination.propTypes;

export default AuthorProfilePagination;
