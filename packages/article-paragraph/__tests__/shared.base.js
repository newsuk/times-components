// eslint-disable import/first
import React from "react";
import TestRenderer from "react-test-renderer";
import Context from "@times-components/context";
import { scales } from "@times-components/styleguide";
import coreRenderers from "@times-components/markup";
import { renderTree } from "@times-components/markup-forest";
import "./mock-text-measure-module";
import ArticleParagraph from "../src";
import paragraphData from "../fixtures/paragraph-showcase.json";
import dropCapData from "../fixtures/drop-cap-showcase.json";
import dropCapShortTextData from "../fixtures/drop-cap-short-text-showcase.json";
import DropCapView from "../src/drop-cap";

const renderParagraph = ast => (
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

export default () => {
  it("paragraph", () => {
    expect(
      TestRenderer.create(renderParagraph(paragraphData))
    ).toMatchSnapshot();
  });

  it("paragraph with a drop cap", () => {
    expect(TestRenderer.create(renderParagraph(dropCapData))).toMatchSnapshot();
  });

  it("paragraph with a short text and a drop cap", () => {
    expect(
      TestRenderer.create(renderParagraph(dropCapShortTextData))
    ).toMatchSnapshot();
  });
};
