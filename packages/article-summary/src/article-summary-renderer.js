import React from "react";
import { Text } from "react-native";

export default {
  link(key, attributes, renderedChildren) {
    return <Text key={key}>{renderedChildren}</Text>;
  },
  paragraph(key, attributes, renderedChildren, index) {
    const padding = renderedChildren.length && index !== 0 ? " " : "";
    return (
      <Text key={key}>
        {padding}
        {renderedChildren}
      </Text>
    );
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
