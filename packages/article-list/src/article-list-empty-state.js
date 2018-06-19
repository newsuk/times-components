import React from "react";
import { View, Text } from "react-native";
import Watermark from "@times-components/watermark";
import styles from "./styles";
import propTypes from "./article-list-empty-state-prop-types";

const ArticleListEmptyState = ({ message }) => (
  <View style={styles.listEmptyStateContainer}>
    <Text style={styles.listEmptyMessage}>{message}</Text>
    <View style={styles.listEmptyWatermark}>
      <Watermark width={300} height={250} />
    </View>
  </View>
);

ArticleListEmptyState.propTypes = propTypes;
export default ArticleListEmptyState;
