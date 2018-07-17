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
    paddingBottom: spacing(2),
    marginBottom: spacing(6),
    marginTop: spacing(6)
  }
});
const defaultRenderers = {
  ad(key, attributes) {
    return {
      element: (
        <Ad key={key} slotName="inline-ad" style={styles.ad} {...attributes} />
      )
    };
  },
  block(key, attributes, renderedChildren) {
    return {
      element: <div key={key}>{renderedChildren}</div>
    };
  },
  bold(key, attributes, renderedChildren) {
    return {
      element: <strong key={key}>{renderedChildren}</strong>
    };
  },
  break(key) {
    return {
      element: <br key={key} />
    };
  },
  italic(key, attributes, renderedChildren) {
    return {
      element: <em key={key}>{renderedChildren}</em>
    };
  },
  inline(key, attributes, renderedChildren) {
    return {
      element: <span key={key}>{renderedChildren}</span>
    };
  },
  paragraph(key, attributes, renderedChildren) {
    return {
      element: <p key={key}>{renderedChildren}</p>
    };
  },
  pullQuote(key, attributes) {
    return {
      element: (
        <PullQuote
          caption={attributes.caption.name}
          content={attributes.content}
          key={key}
        />
      )
    };
  },
  text(key, { value }) {
    return {
      element: value
    };
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
