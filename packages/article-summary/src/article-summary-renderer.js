import React from "react";
import { Text } from "react-native";

export default {
  paragraph(key, attributes, renderedChildren, indx) {
    const padding = renderedChildren.length && indx !== 0 ? " " : "";
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
