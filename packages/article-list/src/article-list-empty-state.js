import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import propTypes from "./article-list-empty-state-prop-types";

const ArticleListEmptyState = ({ message }) => (
  <View style={styles.listEmptyStateContainer}>
    <Text style={styles.listEmptyMessage}>{message}</Text>
  </View>
);

ArticleListEmptyState.propTypes = propTypes;
export default ArticleListEmptyState;
