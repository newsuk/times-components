import React from "react";
import { View, Text } from "react-native";
import { TextLink } from "@times-components/link";
import Watermark from "@times-components/watermark";
import styles from "./styles";

const ArticleListEmptyState = () => (
  <View style={styles.listEmptyStateContainer}>
    <Text style={styles.listEmptyMessage}>
      Unfortunately, there are no articles relating to this topic
    </Text>
    <TextLink
      onPress={() => {}}
      url="https://thetimes.co.uk"
      style={styles.listEmptyBackButton}
      title="Back to home"
    >
      Back to home
    </TextLink>
    <View style={styles.listEmptyWatermark}>
      <Watermark width={500} height={350} viewBox="0 0 350 200" />
    </View>
  </View>
);

export default ArticleListEmptyState;
