/* eslint-disable react/prop-types */
import React from "react";
import { Text } from "react-native";
import renderTrees from "@times-components/markup-forest";
import renderers from "@times-components/markup";
import trimCommasAndDashes from "./utils";
import InlineBlockWrapper from "./styles/responsive";

const bylineRenderers = (Component, textStyle, props = {}, length) => ({
  ...renderers,
  author(key, attributes, children, index) {
    const { isMainStandard } = props;
    const isLast = index === length - 1;
    const trimmedStringName = trimCommasAndDashes(children[0]);

    if (isMainStandard && trimmedStringName === "") {
      return null;
    }

    return isMainStandard ? (
      <InlineBlockWrapper>
        <Component key={key} name={children[0]} {...attributes} {...props}>
          {[trimmedStringName]}
        </Component>
        {!isLast ? <Text>, </Text> : ""}
      </InlineBlockWrapper>
    ) : (
      <Component key={key} name={children[0]} {...attributes} {...props}>
        {children}
      </Component>
    );
  },

  inline(key, attributes, children, index) {
    const { className, bylineStyle, isMainStandard } = props;
    const isLast = index === length - 1;
    const trimmedString = trimCommasAndDashes(children[0]);

    if (isMainStandard && trimmedString === "") {
      return null;
    }

    return isMainStandard ? (
      <InlineBlockWrapper>
        <Text className={className} key={key} style={[textStyle, bylineStyle]}>
          {[trimmedString]}
          {!isLast && <Text>, </Text>}
        </Text>
      </InlineBlockWrapper>
    ) : (
      <Text className={className} key={key} style={[textStyle, bylineStyle]}>
        {children}
      </Text>
    );
  }
});

const renderByline = (Component, ast, textStyle, props = {}) => {
  const bylineAst = ast.map(
    bylineObj =>
      bylineObj.byline && bylineObj.byline.length > 0 ? bylineObj.byline[0] : {}
  );

  return renderTrees(
    bylineAst,
    bylineRenderers(Component, textStyle, props, bylineAst.length)
  );
};

export default renderByline;
