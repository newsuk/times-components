/* eslint-disable react/prop-types */
import React from "react";
import invert from "lodash.invert";
import Context from "@times-components/context";
import coreRenderers from "@times-components/markup";
import { renderTree } from "@times-components/markup-forest";
import { colours, scales } from "@times-components/styleguide";
import paragraphData from "./fixtures/paragraph-showcase.json";
import dropCapData from "./fixtures/drop-cap-showcase.json";
import dropCapShortTextData from "./fixtures/drop-cap-short-text-showcase.json";
import ArticleParagraph from "./src";

const renderParagraphWithScale = (select, ast) => {
  const scale = select("Scale", scales, scales.medium);
  const colour = select(
    "Section",
    invert(colours.section),
    colours.section.default
  );

  return (
    <Context.Provider value={{ theme: { scale } }}>
      {renderTree(ast, {
        ...coreRenderers,
        paragraph(key, attributes, children, indx, node) {
          return {
            element: (
              <ArticleParagraph
                ast={node}
                dropCapColour={colour}
                key={indx}
                uid={indx}
              >
                {children}
              </ArticleParagraph>
            )
          };
        }
      })}
    </Context.Provider>
  );
};

export default {
  children: [
    {
      component: ({ select }) =>
        renderParagraphWithScale(select, paragraphData),
      name: "Paragraph",
      platform: "native",
      type: "story"
    },
    {
      component: ({ select }) => renderParagraphWithScale(select, dropCapData),
      name: "Paragraph with dropcap",
      platform: "native",
      type: "story"
    },
    {
      component: ({ select }) =>
        renderParagraphWithScale(select, dropCapShortTextData),
      name: "DropCap paragraph with short text",
      platform: "native",
      type: "story"
    }
  ],
  name: "Primitives/Article Paragraph"
};
