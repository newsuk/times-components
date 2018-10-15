/* eslint-disable react/prop-types */
import React from "react";
import invert from "lodash.invert";
import Context from "@times-components/context";
import coreRenderers from "@times-components/markup";
import { renderTree } from "@times-components/markup-forest";
import { colours, scales } from "@times-components/styleguide";
import Parapgraph from "./src";
import paragraphData from "./fixtures/paragraph-showcase.json";
import dropCapData from "./fixtures/drop-cap-showcase.json";
import dropCapShortTextData from "./fixtures/drop-cap-short-text-showcase.json";
import DropCapView from "./src/drop-cap";

const renderParagraph = (select, ast) => {
  const scale = select("Scale", scales, scales.medium);
  const colour = select(
    "Section",
    invert(colours.section),
    colours.section.default
  );

  return (
    <Context.Provider value={{ theme: { scale } }}>
      <Parapgraph ast={ast} colour={colour}>
        {renderTree(ast, {
          ...coreRenderers,
          dropCap(key, { value }) {
            return {
              element: (
                <DropCapView colour={colour} key={key}>
                  {value}
                </DropCapView>
              )
            };
          }
        })}
      </Parapgraph>
    </Context.Provider>
  );
};

export default {
  name: "Primitives/Article Paragraph",
  children: [
    {
      type: "story",
      name: "Paragraph",
      component: ({ select }) => renderParagraph(select, paragraphData)
    },
    {
      type: "story",
      name: "Paragraph with dropcap",
      component: ({ select }) => renderParagraph(select, dropCapData)
    },
    {
      type: "story",
      name: "DropCap paragraph with short text",
      component: ({ select }) => renderParagraph(select, dropCapShortTextData)
    }
  ]
};
