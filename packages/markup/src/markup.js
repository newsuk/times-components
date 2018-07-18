import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Ad from "@times-components/ad";
import KeyFacts from "@times-components/key-facts";
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
  ad(key, attributes) {
    return {
      element: (
        <Ad key={key} slotName="inline-ad" style={styles.ad} {...attributes} />
      )
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
  keyFacts(key, attributes, renderedChildren, indx, node) {
    return {
      element: <KeyFacts ast={node} key={key} onLinkPress={() => {}} />,
      shouldRenderChildren: false
    };
  },
  paragraph(key, attributes, renderedChildren) {
    return {
      element: <Text key={key}>{renderedChildren}</Text>
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
    `${index}`,
    index
  );

export const renderTrees = (trees, renderers) =>
  trees.map((tree, index) => renderTree(tree, renderers, index));

export { default as treePropType } from "./tree-prop-types";
