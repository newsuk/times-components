import React from "react";
import { View, Text } from "react-native";
import Button from "@times-components/button";
import Link from "@times-components/link";
import Watermark from "@times-components/watermark";
import styles from "./styles";

const ArticleListEmptyState = () => (
  <View style={styles.listEmptyStateContainer}>
    <Text style={styles.listEmptyMessage}>
      Unfortunately, there are no articles relating to this topic
    </Text>
    <View style={styles.listEmptyBackButton}>
      <Link onPress={() => {}} url="https://thetimes.co.uk">
        <Button onPress={() => {}} title="Back to home" />
      </Link>
    </View>
    <View style={styles.listEmptyWatermark}>
      <Watermark width={500} height={350} viewBox="0 0 350 200" />
    </View>
  </View>
);

export default ArticleListEmptyState;
