import React from "react";
import { StyleSheet } from "react-native";
import Ad from "@times-components/ad";
import KeyFacts, { KeyFactsBullet } from "@times-components/key-facts";
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
    return (
      <Ad key={key} slotName="inline-ad" style={styles.ad} {...attributes} />
    );
  },
  break(key) {
    return <br key={key} />;
  },
  pullQuote(key, attributes) {
    return (
      <PullQuote
        caption={attributes.caption.name}
        content={attributes.content}
        key={key}
      />
    );
  },
  listElement(key, attributes, children) {
    return <KeyFactsBullet key={key}>{children}</KeyFactsBullet>;
  },
  unorderedList(key, attributes, children) {
    return children;
  },
  keyFacts(key, attributes, children) {
    return (
      <KeyFacts key={key} onLinkPress={() => {}} title={attributes.title}>
        {children[0]}
      </KeyFacts>
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
