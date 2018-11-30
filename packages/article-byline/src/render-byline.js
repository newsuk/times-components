import React from "react";
import { Text } from "react-native";
import renderTrees from "@times-components/markup-forest";
import renderers from "@times-components/markup";

const bylineRenderers = (renderAuthorComponent, textStyle, onAuthorPress) => ({
  ...renderers,
  author(key, attributes, children) {
    return renderAuthorComponent(children, key, attributes, onAuthorPress);
  },

  inline(key, attributes, children) {
    return {
      element: (
        <Text key={key} style={textStyle}>
          {children}
        </Text>
      )
    };
  }
});

const renderByline = (renderAuthorComponent, ast, textStyle, onAuthorPress) =>
  renderTrees(
    ast,
    bylineRenderers(renderAuthorComponent, textStyle, onAuthorPress)
  );

export default renderByline;
