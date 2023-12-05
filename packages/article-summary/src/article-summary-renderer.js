import React from "react";
import coreRenderers from "@times-components/markup";
import { TcText } from "@times-components/utils";

const style = {
  color: "inherit",
  font: "inherit",
  "white-space": "inherit"
};
export default {
  ...coreRenderers,
  link(key, attributes, renderedChildren) {
    return (
      <TcText key={key} style={style}>
        {renderedChildren}
      </TcText>
    );
  },
  paragraph(key, attributes, renderedChildren, index) {
    const padding = renderedChildren.length && index !== 0 ? " " : "";
    return (
      <TcText key={key} style={style}>
        {padding}
        {renderedChildren}
      </TcText>
    );
  },
  teaser(key, { isSingle }, renderedChildren) {
    const padding = isSingle ? "" : " ";
    return (
      <TcText key={key} style={style}>
        {padding}
        {renderedChildren}
        ...
      </TcText>
    );
  }
};
