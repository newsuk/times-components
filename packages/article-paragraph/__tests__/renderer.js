import React from "react";
import Context from "@times-components/context";
import { scales, themeFactory } from "@times-components/styleguide";
import coreRenderers from "@times-components/markup";
import { renderTree } from "@times-components/markup-forest";
import "./mock-text-measure-module";
import ArticleParagraph from "../src";

export default (ast, section = "default") => {
  const theme = themeFactory(section, "magazinestandard");
  const renderers = {
    ...coreRenderers,
    paragraph(key, attributes, children, indx, node) {
      return {
        element: (
          <ArticleParagraph
            ast={node}
            dropCapFont={theme.dropCapFont}
            key={indx}
            localRender={renderers}
            uid={indx}
          >
            {children}
          </ArticleParagraph>
        )
      };
    }
  };
  return (
    <Context.Provider
      value={{
        theme: {
          scale: scales.medium
        }
      }}
    >
      {renderTree(ast, renderers)}
    </Context.Provider>
  );
};
