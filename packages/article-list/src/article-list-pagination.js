import React from "react";
import { TcView } from "@times-components/utils";
import Pagination from "@times-components/pagination";
import PropTypes from "prop-types";
import styles from "./styles";

const ArticleListPagination = props => (
  <TcView style={styles.paginationContainer}>
    <TcView style={styles.paginationSpacing}>
      <Pagination {...props} generatePageLink={pageNum => `?page=${pageNum}`} />
    </TcView>
  </TcView>
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
