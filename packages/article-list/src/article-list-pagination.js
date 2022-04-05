import React from "react";
import { View } from "react-native";
import Pagination from "@times-components/pagination";
import PropTypes from "prop-types";
import styles from "./styles";

const ArticleListPagination = props => (
  <View style={styles.paginationContainer}>
    <View style={styles.paginationSpacing}>
      <Pagination {...props} generatePageLink={pageNum => `?page=${pageNum}`} />
    </View>
  </View>
);

ArticleListPagination.propTypes = {
  count: PropTypes.number.isRequired,
  hideResults: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired
};

export default ArticleListPagination;
