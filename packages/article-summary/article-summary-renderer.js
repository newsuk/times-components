import React from "react";
import { Text } from "react-native";

export default {
  sentence(key, attributes, renderedChildren) {
    return <Text key={key}>{renderedChildren}. </Text>;
  },
  teaser(key, attributes, renderedChildren) {
    return <Text key={key}>{renderedChildren}...</Text>;
  }
};
