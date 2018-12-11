import React from "react";
import invert from "lodash.invert";
import coreRenderers from "@times-components/markup";
import { renderTree } from "@times-components/markup-forest";
import { colours } from "@times-components/styleguide";
import ArticleParagraph from "./src";
import DropCapView from "./src/drop-cap";

export default (select, ast) => {
  const colour = select(
    "Section",
    invert(colours.section),
    colours.section.default
  );

  return renderTree(ast, {
    ...coreRenderers,
    dropCap(key, { value }) {
      return {
        element: (
          <DropCapView colour={colour} key={key}>
            {value}
          </DropCapView>
        )
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
  });
};
