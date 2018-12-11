/* eslint-disable react/prop-types */
import React from "react";
import Context from "@times-components/context";
import { scales } from "@times-components/styleguide";
import paragraphData from "./fixtures/paragraph-showcase.json";
import dropCapData from "./fixtures/drop-cap-showcase.json";
import dropCapShortTextData from "./fixtures/drop-cap-short-text-showcase.json";
import renderParagraph from "./showcase-helper";

const renderParagraphWithScale = (select, ast) => {
  const scale = select("Scale", scales, scales.medium);

  return (
    <Context.Provider value={{ theme: { scale } }}>
      {renderParagraph(select, ast)}
    </Context.Provider>
  );
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
      component: ({ select }) => renderParagraph(select, dropCapShortTextData),
      name: "DropCap paragraph with short text",
      platform: "web",
      type: "story"
    },
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
