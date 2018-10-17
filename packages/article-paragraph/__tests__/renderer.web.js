import React from "react";
import Context from "@times-components/context";
import { scales } from "@times-components/styleguide";
import coreRenderers from "@times-components/markup";
import { renderTree } from "@times-components/markup-forest";
import ArticleParagraph from "../src";
import DropCapView from "../src/drop-cap";

export default ast => (
  <Context.Provider value={{ theme: { scale: scales.medium } }}>
    {renderTree(ast, {
      ...coreRenderers,
      dropCap(key, { value }) {
        return {
          element: <DropCapView key={key}>{value}</DropCapView>
        };
      },
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
