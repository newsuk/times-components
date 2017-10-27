import Ad from "@times-components/ad";
import React from "react";
import { StyleSheet } from "react-native";
import renderTreeWithoutDefaults from "./render-tree-without-defaults";

const styles = StyleSheet.create({
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
    return <p key={key}>{renderedChildren}</p>;
  },
  text(key, { value }) {
    return value;
  },
  bold(key, attributes, renderedChildren) {
    return <strong key={key}>{renderedChildren}</strong>;
  },
  italic(key, attributes, renderedChildren) {
    return <em key={key}>{renderedChildren}</em>;
  },
  inline(key, attributes, renderedChildren) {
    return <span key={key}>{renderedChildren}</span>;
  },
  ad(key) {
    return <Ad key={key} code="intervention" style={styles.ad} />;
  },
  break(key) {
    return <br key={key} />;
  }
};

export const renderTree = (tree, renderers, index = 0) =>
  renderTreeWithoutDefaults(
    tree,
    Object.assign({}, defaultRenderers, renderers),
    index ? `${index}` : "",
    index
  );

export const renderTrees = (trees, renderers) =>
  trees.map((tree, index) => renderTree(tree, renderers, index));

export { default as treePropType } from "./tree-proptype";
