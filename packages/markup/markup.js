import Ad from "@times-components/ad";
import React from "react";
import { Text, StyleSheet } from "react-native";
import renderTreeWithoutDefaults from "./render-tree-without-defaults";

const styles = StyleSheet.create({
  italic: {
    fontStyle: "italic"
  },
  bold: {
    fontWeight: "bold"
  },
  ad: {
    borderTopColor: "#dbdbdb",
    borderBottomColor: "#dbdbdb",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10
  }
});

const defaultRenderers = {
  paragraph(key, attributes, renderedChildren) {
    return <Text key={key}>{renderedChildren}</Text>;
  },
  text(key, { value }) {
    return value;
  },
  bold(key, attributes, renderedChildren) {
    return (
      <Text key={key} style={styles.bold}>
        {renderedChildren}
      </Text>
    );
  },
  italic(key, attributes, renderedChildren) {
    return (
      <Text key={key} style={styles.italic}>
        {renderedChildren}
      </Text>
    );
  },
  inline(key, attributes, renderedChildren) {
    return <Text key={key}>{renderedChildren}</Text>;
  },
  ad(key) {
    return (
      <Ad key={key} code="intervention" section="article" style={styles.ad} />
    );
  }
};

export const renderTree = (tree, renderers, key = "") =>
  renderTreeWithoutDefaults(
    tree,
    Object.assign({}, defaultRenderers, renderers),
    key
  );

export const renderTrees = (trees, renderers) =>
  trees.map((tree, index) => renderTree(tree, renderers, index));

export { default as treePropType } from "./tree-proptype";
