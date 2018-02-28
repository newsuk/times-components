import React from "react";
import { Text } from "react-native";
import styles from "./styles";
import { Heading } from "./styles/responsive";

const RelatedArticlesHeading = () => (
  <Heading>
    <Text accessibilityRole="heading" aria-level="3" style={styles.title}>
      Related links
    </Text>
  </Heading>
);

export default RelatedArticlesHeading;
