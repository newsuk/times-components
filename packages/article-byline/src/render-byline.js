/* eslint-disable react/prop-types */
import React from "react";
import { TcText, checkStylesForUnits } from "@times-components/utils";
import renderTrees from "@times-components/markup-forest";
import renderers from "@times-components/markup";
import styled from "styled-components";

const InlineText = styled(TcText)`
  ${props =>
    props.textStyle ? checkStylesForUnits(props.textStyle) : ""} ${props =>
    props.bylineStyle ? checkStylesForUnits(props.bylineStyle) : ""};
`;

const bylineRenderers = (Component, textStyle, props = {}) => ({
  ...renderers,
  author(key, attributes, children) {
    return (
      <Component key={key} name={children[0]} {...attributes} {...props}>
        {children}
      </Component>
    );
  },

  inline(key, attributes, children) {
    const { className, bylineStyle } = props;
    return (
      <InlineText
        className={className}
        key={key}
        textStyle={textStyle}
        bylineStyle={bylineStyle}
      >
        {children}
      </InlineText>
    );
  }
});

const renderByline = (Component, ast, textStyle, props = {}) => {
  const bylineAst = ast.map(
    bylineObj =>
      bylineObj.byline && bylineObj.byline.length > 0 ? bylineObj.byline[0] : {}
  );
  return renderTrees(bylineAst, bylineRenderers(Component, textStyle, props));
};

export default renderByline;
