import React from "react";
import { themeFactory } from "@times-components/styleguide";
import { renderTree } from "@times-components/markup-forest";
import renderers from "@times-components/markup";
import ArticleParagraph from "../src";

export default (ast, section = "default") => {
  const theme = themeFactory(section, "magazinestandard");
  const rendered = renderTree(ast, {
    ...renderers,
    paragraph(key, attributes, children, indx, node) {
      return (
        <ArticleParagraph
          ast={node}
          dropCapFont={theme.dropCapFont}
          key={indx}
          uid={indx}
        >
          {children}
        </ArticleParagraph>
      );
    }
  });
  return rendered;
};
