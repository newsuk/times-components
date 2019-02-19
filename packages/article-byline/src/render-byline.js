import React from "react";
import { Text } from "react-native";
import renderTrees from "@times-components/markup-forest";
import renderers from "@times-components/markup";

const bylineRenderers = (renderAuthorComponent, textStyle, props = {}) => ({
  ...renderers,
  author(key, attributes, children) {
    return renderAuthorComponent(children, key, attributes, props);
  },

  inline(key, attributes, children) {
    return {
      element: (
        <Text
          className={props.className}
          key={key}
          style={[textStyle, props.opinionStyle]}
        >
          {children}
        </Text>
      )
    };
  }
});

const renderByline = (renderAuthorComponent, ast, textStyle, props = {}) =>
  renderTrees(ast, bylineRenderers(renderAuthorComponent, textStyle, props));

export default renderByline;
