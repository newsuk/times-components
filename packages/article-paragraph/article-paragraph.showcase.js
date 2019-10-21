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
import DropCapView from "./src/drop-cap";

const renderParagraphWithScale = ({ select, boolean }, ast) => {
  const scale = select("Scale", scales, scales.medium);
  const section = select("Section", sections, "The Times Magazine");
  const theme = themeFactory(section, "magazinestandard");
  const enableDropcap = boolean && boolean("Enable DropCap", true);

  return (
    <ContextProviderWithDefaults value={{ theme: { scale } }}>
      {renderTree(ast, {
        ...coreRenderers,
        dropCap(key, { value }) {
          return (
            enableDropcap && (
              <DropCapView
                {...{
                  colour: theme.sectionColour,
                  font: theme.dropCapFont,
                  key,
                  dropCap: value,
                  scale
                }}
              />
            )
          );
        },
        paragraph(key, attributes, children, indx, node) {
          return (
            <ArticleParagraph
              ast={node}
              dropCapColour={theme.sectionColour}
              dropCapFont={theme.dropCapFont}
              key={indx}
              uid={indx}
            >
              {children}
            </ArticleParagraph>
          );
        }
      })}
    </ContextProviderWithDefaults>
  );
};

export default {
  children: [
    {
      component: ({ select }) =>
        renderParagraphWithScale({ select }, paragraphData),
      name: "Paragraph",
      platform: "native",
      type: "story"
    },
    {
      component: ({ select, boolean }) =>
        renderParagraphWithScale({ select, boolean }, dropCapData),
      name: "Paragraph with dropcap",
      platform: "native",
      type: "story"
    },
    {
      component: ({ select, boolean }) =>
        renderParagraphWithScale({ select, boolean }, dropCapShortTextData),
      name: "DropCap paragraph with short text",
      platform: "native",
      type: "story"
    }
  ],
  name: "Primitives/Article Paragraph|Dropcap"
};
