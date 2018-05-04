import React from "react";
import { View } from "react-native";
import Pagination from "@times-components/pagination";
import styles from "./styles";

const ArticleListPagination = props => (
  <View style={styles.paginationContainer}>
    <View style={styles.paginationSpacing}>
      <Pagination {...props} generatePageLink={pageNum => `?page=${pageNum}`} />
    </View>
  </View>
);

ArticleListPagination.propTypes = Pagination.propTypes;

export default ArticleListPagination;
