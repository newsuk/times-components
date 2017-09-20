import Ad from "@times-components/ad";
import React from "react";
import { StyleSheet } from "react-native";
import renderTreeWithoutDefaults from "./render-tree-without-defaults";

const styles = StyleSheet.create({
  ad: {
    borderTop: "1px solid #bdbdbd",
    borderBottom: "1px solid #bdbdbd"
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
