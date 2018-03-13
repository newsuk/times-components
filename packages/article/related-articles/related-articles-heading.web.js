import React from "react";
import { StyleSheet, Text, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours } from "@times-components/styleguide";
import styles from "./styles";

const Heading = withResponsiveStyles(View, {
  base: () => `
    align-items: center;
    border-style: solid;
    border-bottom-color: ${colours.functional.keyline};
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    border-top-color: ${colours.functional.keyline};
    border-top-width: ${StyleSheet.hairlineWidth}px;
    display: flex;
    height: 55px;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
  `,
  mediumUp: () => `
    margin-left: 0;
    margin-right: 0;
  `
});
Heading.displayName = "Heading";

const RelatedArticlesHeading = () => (
  <Heading>
    <Text accessibilityRole="heading" aria-level="3" style={styles.title}>
      Related articles
    </Text>
  </Heading>
);

export default RelatedArticlesHeading;
