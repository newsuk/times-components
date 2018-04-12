import React from "react";
import { Text } from "react-native";

export default {
  paragraph(key, attributes, renderedChildren, index) {
    const padding = renderedChildren.length && index !== 0 ? " " : "";
    return (
      <Text key={key}>
        {padding}
        {renderedChildren}
      </Text>
    );
  },
  text(key, { value }) {
    return value.trim();
  },
  teaser(key, { isSingle }, renderedChildren) {
    const padding = isSingle ? "" : " ";
    return (
      <Text key={key}>
        {padding}
        {renderedChildren}...
      </Text>
    );
  }
};
