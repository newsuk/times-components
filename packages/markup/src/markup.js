import React from "react";
import { Text, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  italic: {
    fontStyle: "italic"
  },
  bold: {
    fontWeight: "bold"
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
  text(key, { value }) {
    return {
      element: value
    };
  }
};
