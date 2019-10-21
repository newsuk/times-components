/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import coreRenderers from "@times-components/markup";
import { renderTree } from "@times-components/markup-forest";
import { colours, themeFactory } from "@times-components/styleguide";
import { ArticleLink } from "@times-components/article-skeleton";
import paragraphData from "./fixtures/paragraph-showcase.json";
import dropCapData from "./fixtures/drop-cap-showcase.json";
import dropCapShortTextData from "./fixtures/drop-cap-short-text-showcase.json";
import dropCapAsLink from "./fixtures/drop-cap-as-link-showcase.json";
import dropCapAsQuote from "./fixtures/drop-cap-as-quote-showcase.json";
import ArticleParagraph from "./src";
import DropCapView from "./src/drop-cap";

const dropCapTypes = { dropCap: dropCapData, dropCapAsLink, dropCapAsQuote };

const renderParagraph = ({ select, boolean }, ast) => {
  const sections = Object.keys(colours.section).sort();
  const sectionIdx = select("Section", sections, 0);
  const enableDropcap = boolean && boolean("Enable DropCap", true);
  const section = sections[sectionIdx];
  const theme = themeFactory(section, "magazinecomment");
  const colour = theme.sectionColour;
  const font = theme.dropCapFont;
  const dropCapAst = !ast && select("DropCap Type", dropCapTypes, dropCapData);

  return renderTree(ast || dropCapAst, {
    ...coreRenderers,
    dropCap(key, { value }) {
      return (
        enableDropcap && (
          <DropCapView {...{ colour, font, key }}>
            {unescape(value)}
          </DropCapView>
        )
      );
    },
    paragraph(key, attributes, children, indx, node) {
      return (
        <ArticleParagraph ast={node} key={indx} uid={indx}>
          {children}
        </ArticleParagraph>
      );
    },
    link(key, attributes, children) {
      const { href, target, dropCap } = attributes;

      return (
        <ArticleLink dropCap={dropCap} key={key} target={target} url={href}>
          {children}
        </ArticleLink>
      );
    }
  });
};

export default {
  children: [
    {
      component: ({ select }) => renderParagraph({ select }, paragraphData),
      name: "Paragraph",
      platform: "web",
      type: "story"
    },
    {
      component: ({ select, boolean }) =>
        renderParagraph({ select, boolean }, dropCapData),
      name: "Paragraph with dropcap",
      platform: "web",
      type: "story"
    },
    {
      component: ({ select, boolean }) => (
        <Fragment>
          {renderParagraph({ select, boolean }, dropCapShortTextData)}
          {renderParagraph({ select, boolean }, paragraphData)}
          {renderParagraph({ select, boolean }, paragraphData)}
        </Fragment>
      ),
      name: "DropCap paragraph with short text",
      platform: "web",
      type: "story"
    },
    {
      component: ({ select, boolean }) => renderParagraph({ select, boolean }),
      name: "Drop Cap",
      platform: "web",
      type: "story"
    }
  ],
  name: "Primitives/Article Paragraph|Dropcap"
};
