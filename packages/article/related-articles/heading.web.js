import React from "react";
import { Text } from "react-native";
import styles from "./styles";
import { RelatedArticlesHeading } from "./styles/responsive";

const Heading = () => (
  <RelatedArticlesHeading>
    <Text accessibilityRole="heading" aria-level="3" style={styles.title}>
      Related links
    </Text>
  </RelatedArticlesHeading>
);

export default Heading;
