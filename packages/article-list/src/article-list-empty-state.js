import React from "react";
import { View, Text } from "react-native";
import Watermark from "@times-components/watermark";
import styles from "./styles";

const ArticleListEmptyState = () => (
  <View style={styles.listEmptyStateContainer}>
    <Text style={styles.listEmptyMessage}>
      Unfortunately, there are no articles relating to this topic
    </Text>
    <View style={styles.listEmptyWatermark}>
      <Watermark width={300} height={250} />
    </View>
  </View>
);

export default ArticleListEmptyState;
