import React from "react";

import { View, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const RelatedArticlesHeading = ({ heading }) => (
  <View style={styles.titleContainer}>
    <Text accessibilityRole="header" aria-level="3" style={styles.title}>
      {heading}
    </Text>
  </View>
);

RelatedArticlesHeading.propTypes = {
  heading: PropTypes.string
};

RelatedArticlesHeading.defaultProps = {
  heading: "Related articles"
};

export default RelatedArticlesHeading;
