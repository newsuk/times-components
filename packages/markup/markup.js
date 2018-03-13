import React from "react";
import { Text, StyleSheet } from "react-native";
import Ad from "@times-components/ad";
import PullQuote from "@times-components/pull-quote";
import { colours } from "@times-components/styleguide";
import renderTreeWithoutDefaults from "./render-tree-without-defaults";

const styles = StyleSheet.create({
  italic: {
    fontStyle: "italic"
  },
  bold: {
    fontWeight: "bold"
  },
  ad: {
    borderTopColor: colours.functional.keyline,
    borderBottomColor: colours.functional.keyline,
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
    return <Ad key={key} pos="inline-ad" section="article" style={styles.ad} />;
  },
  break(key) {
    return <Text key={key}>{"\n"}</Text>;
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

export { default as treePropType } from "./tree-proptype";
