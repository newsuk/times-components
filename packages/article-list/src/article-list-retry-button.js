import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import propTypes from "./article-list-retry-button-prop-types";
import styles from "./styles";

const ArticleListRetryButton = ({ refetch }) => (
  <TouchableOpacity accessible accessibilityLabel="Retry" onPress={refetch}>
    <View style={styles.listErrorButton}>
      <Text style={styles.listErrorButtonText}>RETRY</Text>
    </View>
  </TouchableOpacity>
);

ArticleListRetryButton.propTypes = propTypes;

export default ArticleListRetryButton;
