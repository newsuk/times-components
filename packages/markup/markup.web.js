import React from "react";
import { StyleSheet } from "react-native";
import Ad from "@times-components/ad";
import { TextLink } from "@times-components/link";
import PullQuote from "@times-components/pull-quote";
import renderTreeWithoutDefaults from "./render-tree-without-defaults";

const styles = StyleSheet.create({
  ad: {
    borderTopColor: "#dbdbdb",
    borderBottomColor: "#dbdbdb",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10
  },
  link: {
    fontFamily: "TimesDigitalW04-Regular",
    fontSize: 18,
    lineHeight: 30,
    color: "#069"
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
  },
  pullQuote(key, attributes) {
    return (
      <PullQuote
        key={key}
        content={attributes.content}
        caption={attributes.caption.name}
      />
    );
  },
  link(key, attributes, renderedChildren) {
    return (
      <TextLink
        key={key}
        style={styles.link}
        url={attributes.href}
        onPress={() => null}
      >
        {renderedChildren}
      </TextLink>
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
