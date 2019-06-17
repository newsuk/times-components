/* eslint-disable react/prop-types */
import React from "react";
import { ContextProviderWithDefaults } from "@times-components/context";
import coreRenderers from "@times-components/markup";
import { renderTree } from "@times-components/markup-forest";
import { sections } from "@times-components/storybook";
import { scales, themeFactory } from "@times-components/styleguide";
import paragraphData from "./fixtures/paragraph-showcase.json";
import dropCapData from "./fixtures/drop-cap-showcase.json";
import dropCapShortTextData from "./fixtures/drop-cap-short-text-showcase.json";
import ArticleParagraph from "./src";

const renderParagraphWithScale = (select, ast) => {
  const scale = select("Scale", scales, scales.medium);
  const section = select("Section", sections, "The Times Magazine");
  const theme = themeFactory(section, "magazinestandard");

  return (
    <ContextProviderWithDefaults value={{ theme: { scale } }}>
      {renderTree(ast, {
        ...coreRenderers,
        paragraph(key, attributes, children, indx, node) {
          return {
            element: (
              <ArticleParagraph
                ast={node}
                dropCapColour={theme.sectionColour}
                dropCapFont={theme.dropCapFont}
                key={indx}
                uid={indx}
              >
                {children}
              </ArticleParagraph>
            )
          };
        }
      })}
    </ContextProviderWithDefaults>
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
