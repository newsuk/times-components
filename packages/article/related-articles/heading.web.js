import React from "react";
import { Text } from "react-native";
import styles from "./styles";
import { StyledRelatedArticlesHeading } from "./styles/responsive";

const RelatedArticlesHeading = () => (
  <StyledRelatedArticlesHeading>
    <Text accessibilityRole="heading" aria-level="3" style={styles.title}>
      Related links
    </Text>
  </StyledRelatedArticlesHeading>
);

export default RelatedArticlesHeading;
