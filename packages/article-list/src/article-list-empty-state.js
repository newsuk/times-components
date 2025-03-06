import React from "react";
import { TcView, TcText, checkStylesForUnits } from "@times-components/utils";
import styles from "./styles";
import propTypes from "./article-list-empty-state-prop-types";

const ArticleListEmptyState = ({ message }) => (
  <TcView style={styles.listEmptyStateContainer}>
    <TcText style={checkStylesForUnits(styles.listEmptyMessage)}>
      {message}
    </TcText>
  </TcView>
);

ArticleListEmptyState.propTypes = propTypes;
export default ArticleListEmptyState;
