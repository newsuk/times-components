/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import coreRenderers from "@times-components/markup";
import { renderTree } from "@times-components/markup-forest";
import { colours, themeFactory } from "@times-components/styleguide";
import paragraphData from "./fixtures/paragraph-showcase.json";
import dropCapData from "./fixtures/drop-cap-showcase.json";
import dropCapShortTextData from "./fixtures/drop-cap-short-text-showcase.json";
import ArticleParagraph from "./src";
import DropCapView from "./src/drop-cap";

const renderParagraph = (select, ast) => {
  const sections = Object.keys(colours.section).sort();
  const sectionIdx = select("Section", sections, 0);
  const section = sections[sectionIdx];
  const theme = themeFactory(section, "magazinecomment");
  const colour = theme.sectionColour;
  const font = theme.dropCapFont;

  return renderTree(ast, {
    ...coreRenderers,
    dropCap(key, { value }) {
      return {
        element: <DropCapView {...{ colour, font, key }}>{value}</DropCapView>
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

export default {
  children: [
    {
      component: ({ select }) => renderParagraph(select, paragraphData),
      name: "Paragraph",
      platform: "web",
      type: "story"
    },
    {
      component: ({ select }) => renderParagraph(select, dropCapData),
      name: "Paragraph with dropcap",
      platform: "web",
      type: "story"
    },
    {
      component: ({ select }) => (
        <Fragment>
          {renderParagraph(select, dropCapShortTextData)}
          {renderParagraph(select, paragraphData)}
          {renderParagraph(select, paragraphData)}
        </Fragment>
      ),
      name: "DropCap paragraph with short text",
      platform: "web",
      type: "story"
    }
  ],
  name: "Primitives/Article Paragraph"
};
