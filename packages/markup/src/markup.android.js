import React from "react";
import { Text, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  emphasis: {
    fontStyle: "italic"
  },
  strong: {
    fontWeight: "bold"
  },
  subscript: {
  },
  superscript: {
  },
  wordBreakOpportunity: {
    fontSize: .1,
  }
});

export default {
  block(key, attributes, renderedChildren) {
    return {
      element: <View key={key}>{renderedChildren}</View>
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
        <Text key={key} style={styles.emphasis}>
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
  paragraph(key, attributes, renderedChildren) {
    return {
      element: <Text key={key}>{renderedChildren}</Text>
    };
  },
  strong(key, attributes, renderedChildren) {
    return {
      element: (
        <Text key={key} style={styles.strong}>
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
  },
  wordBreakOpportunity(key) {
    return {
      element: (
        <Text key={key} style={styles.wordBreakOpportunity}>
          {" "}
        </Text>
      )
    };
  }
};
