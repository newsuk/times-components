import React from "react";
import { Text, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold"
  },
  italic: {
    fontStyle: "italic"
  },
  subscript: {
    fontSize: 10
  },
  superscript: {
    fontSize: 10
  }
});

export default {
  block(key, attributes, renderedChildren) {
    return {
      element: <View key={key}>{renderedChildren}</View>
    };
  },
  bold(key, attributes, renderedChildren) {
    return {
      element: (
        <Text key={key} style={styles.bold}>
          {renderedChildren}
        </Text>
      )
    };
  },
  break(key) {
    return {
      element: <Text key={key}>{"\n"}</Text>
    };
  },
  emphasis(key, attributes, renderedChildren) {
    return {
      element: (
        <Text key={key} style={styles.italic}>
          {renderedChildren}
        </Text>
      )
    };
  },
  inline(key, attributes, renderedChildren) {
    return {
      element: <Text key={key}>{renderedChildren}</Text>
    };
  },
  italic(key, attributes, renderedChildren) {
    return {
      element: (
        <Text key={key} style={styles.italic}>
          {renderedChildren}
        </Text>
      )
    };
  },
  paragraph(key, attributes, renderedChildren) {
    return {
      element: <Text key={key}>{renderedChildren}</Text>
    };
  },
  strong(key, attributes, renderedChildren) {
    return {
      element: (
        <Text key={key} style={styles.bold}>
          {renderedChildren}
        </Text>
      )
    };
  },
  subscript(key, attributes, renderedChildren) {
    return {
      element: (
        <Text key={key} style={styles.subscript}>
          {renderedChildren}
        </Text>
      )
    };
  },
  superscript(key, attributes, renderedChildren) {
    return {
      element: (
        <Text key={key} style={styles.superscript}>
          {renderedChildren}
        </Text>
      )
    };
  },
  text(key, { value }) {
    return {
      element: value
    };
  }
};

export { default as flow } from "./markup-flow";
