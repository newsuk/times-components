import React from "react";
import { Text } from "react-native";

export default {
  paragraph(key, attributes, renderedChildren) {
    return <Text key={key}>{renderedChildren} </Text>;
  },
  sentence(key, attributes, renderedChildren) {
    return <Text key={key}>{renderedChildren}. </Text>;
  },
  teaser(key, attributes, renderedChildren) {
    return <Text key={key}>{renderedChildren}...</Text>;
  }
};
