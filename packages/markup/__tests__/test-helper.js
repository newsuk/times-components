/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";

const singleParagraph = require("../fixtures/single-paragraph.json").fixture;
const multiParagraph = require("../fixtures/multi-paragraph.json").fixture;
const multiParagraphWithAds = require("../fixtures/multi-paragraph-with-ads.json")
  .fixture;
const anchor = require("../fixtures/anchor.json").fixture;
const bold = require("../fixtures/bold.json").fixture;
const italic = require("../fixtures/italic.json").fixture;
const span = require("../fixtures/span.json").fixture;
const mixture = require("../fixtures/tag-mixture.json").fixture;
const nested = require("../fixtures/nested.json").fixture;
const bio = require("../fixtures/bio.json").fixture;
const script = require("../fixtures/script.json").fixture;
const image = require("../fixtures/image.json").fixture;

export default (
  renderTree,
  renderTrees,
  TextComponent,
  BlockComponent
) => () => {
  it("renders a single paragraph", () => {
    const output = renderer.create(renderTree(singleParagraph[0])).toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders multiple paragraphs", () => {
    const output = renderer
      .create(<BlockComponent>{renderTrees(multiParagraph)}</BlockComponent>)
      .toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders multiple paragraphs with ads", () => {
    const output = renderer
      .create(
        <BlockComponent>{renderTrees(multiParagraphWithAds)}</BlockComponent>
      )
      .toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders the anchor tag", () => {
    const output = renderer
      .create(
        renderTree(anchor[0], {
          link(key, { href }, children) {
            return (
              <TextComponent key={key} href={href}>
                {children}
              </TextComponent>
            );
          }
        })
      )
      .toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders the bold tag", () => {
    const output = renderer.create(renderTree(bold[0])).toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders the italic tag", () => {
    const output = renderer.create(renderTree(italic[0])).toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders the span tag", () => {
    const output = renderer.create(renderTree(span[0])).toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders a mixture of tags", () => {
    const output = renderer
      .create(
        renderTree(mixture[0], {
          block(key, attributes, renderedChildren) {
            return (
              <BlockComponent key={key}>{renderedChildren}</BlockComponent>
            );
          },
          link(key, attributes, renderedChildren) {
            return (
              <TextComponent key={key} href={attributes.href}>
                {renderedChildren}
              </TextComponent>
            );
          }
        })
      )
      .toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders tags nested within blocks", () => {
    const output = renderer
      .create(
        renderTree(nested[0], {
          block(key, attributes, renderedChildren) {
            return (
              <BlockComponent key={key}>{renderedChildren}</BlockComponent>
            );
          }
        })
      )
      .toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders wrapped tags", () => {
    const output = renderer
      .create(<TextComponent>{renderTrees(bio)}</TextComponent>)
      .toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders multiple children", () => {
    const output = renderer
      .create(
        <TextComponent style={{ color: "red" }}>
          {renderTrees(multiParagraph)}
        </TextComponent>
      )
      .toJSON();

    expect(output).toMatchSnapshot();
  });

  it("does not render a script tag", () => {
    const output = renderer
      .create(<BlockComponent>{renderTrees(script)}</BlockComponent>)
      .toJSON();

    expect(output).toMatchSnapshot();
  });

  it("does not render an image tag", () => {
    const output = renderer
      .create(<BlockComponent>{renderTrees(image)}</BlockComponent>)
      .toJSON();

    expect(output).toMatchSnapshot();
  });
};
