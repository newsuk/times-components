import React from "react";
import Context from "@times-components/context";
import { scales } from "@times-components/styleguide";
import coreRenderers from "@times-components/markup";
import { renderTree } from "@times-components/markup-forest";
import "./mock-text-measure-module";
import ArticleParagraph from "../src";

export default ast => (
  <Context.Provider value={{ theme: { scale: scales.medium } }}>
    {renderTree(ast, {
      ...coreRenderers,
      paragraph(key, attributes, children, indx, node) {
        return {
          element: (
            <ArticleParagraph ast={node} key={indx} uid={indx}>
              {children}
            </ArticleParagraph>
          )
        };
      }
    })}
  </Context.Provider>
);
