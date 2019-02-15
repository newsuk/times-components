import React from "react";
import Context from "@times-components/context";
import { scales, themeFactory } from "@times-components/styleguide";
import coreRenderers from "@times-components/markup";
import { renderTree } from "@times-components/markup-forest";
import ArticleParagraph from "../src";
import DropCapView from "../src/drop-cap";

export default (ast, section = "default") => {
  const theme = themeFactory(section, "magazinestandard");
  const renderers = {
    ...coreRenderers,
    dropCap(key, { value }) {
      return {
        element: (
          <DropCapView
            font={theme.dropCapFont}
            key={key}
            localRender={renderers}
          >
            {value}
          </DropCapView>
        )
      };
    },
    paragraph(key, attributes, children, indx, node) {
      return {
        element: (
          <ArticleParagraph
            ast={node}
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
          ...themeFactory(section, "mainstandard"),
          scale: scales.medium
        }
      }}
    >
      {renderTree(ast, renderers)}
    </Context.Provider>
  );
};
