import React from "react";
import { Text } from "react-native";
import { renderTrees } from "@times-components/markup";
import styles from "../styles";

export const getBylineStyles = (style, color) => [
  styles.link,
  color && { color },
  style.link
];

export const renderByline = (
  renderAuthorComponent,
  ast,
  bylineStyles,
  onAuthorPress
) =>
  renderTrees(ast, {
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
      return (
        <Text style={styles} key={key}>
          {children}
        </Text>
      );
    }
  });
