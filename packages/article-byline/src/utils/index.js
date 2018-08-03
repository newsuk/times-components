import React from "react";
import { Text } from "react-native";
import renderTrees from "@times-components/markup-forest";
import renderers from "@times-components/markup";
import styles from "../styles";

export const getBylineStyles = (style, color) => [
  styles.text,
  styles.link,
  color && { color },
  style.link
];

const bylineRenderers = (
  renderAuthorComponent,
  bylineStyles,
  onAuthorPress
) => ({
  ...renderers,
  author(key, attributes, children) {
    return renderAuthorComponent(
      children,
      bylineStyles,
      key,
      attributes,
      onAuthorPress
    );
  },

  inline(key, attributes, children) {
    return {
      element: (
        <Text key={key} style={bylineStyles}>
          {children}
        </Text>
      )
    };
  }
});

export const renderByline = (
  renderAuthorComponent,
  ast,
  bylineStyles,
  onAuthorPress
) =>
  renderTrees(
    ast,
    bylineRenderers(renderAuthorComponent, bylineStyles, onAuthorPress)
  );
