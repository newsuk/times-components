import React from "react";
import { Text, StyleSheet } from "react-native";

export const renderer = {
  paragraph(key, attributes, renderedChildren) {
    return <Text key={key}>{renderedChildren}. </Text>;
  },
  teaser(key, attributes, renderedChildren) {
    return <Text key={key}>{renderedChildren}...</Text>;
  }
};
