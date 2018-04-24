import React from "react";
import { StyleSheet } from "react-native";
import Ad from "@times-components/ad";
import PullQuote from "@times-components/pull-quote";
import { colours, spacing } from "@times-components/styleguide";
import renderTreeWithoutDefaults from "./render-tree-without-defaults";

const styles = StyleSheet.create({
  ad: {
    borderTopColor: colours.functional.keyline,
    borderBottomColor: colours.functional.keyline,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: spacing(2),
    paddingBottom: spacing(2)
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
  ad(key, attributes) {
    return <Ad key={key} pos="inline-ad" style={styles.ad} {...attributes} />;
  },
  break(key) {
    return <br key={key} />;
  },
  pullQuote(key, attributes) {
    return (
      <PullQuote
        key={key}
        content={attributes.content}
        caption={attributes.caption.name}
      />
    );
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

export { default as treePropType } from "./tree-prop-types";
