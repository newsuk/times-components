import React from "react";
import renderer from "react-test-renderer";

const singleParagraph = require("../fixtures/single-paragraph.json");
const multiParagraph = require("../fixtures/multi-paragraph.json");
const multiParagraphWithAds = require("../fixtures/multi-paragraph-with-ads.json");
const multiParagraphWithPullQuote = require("../fixtures/multi-paragraph-with-pullquote.json");
const anchor = require("../fixtures/anchor.json");
const bold = require("../fixtures/bold.json");
const italic = require("../fixtures/italic.json");
const span = require("../fixtures/span.json");
const lineBreak = require("../fixtures/line-break.json");
const mixture = require("../fixtures/tag-mixture.json");
const nested = require("../fixtures/nested.json");
const bio = require("../fixtures/bio.json");
const script = require("../fixtures/script.json");
const image = require("../fixtures/image.json");

// don't render ad internals
jest.mock("@times-components/ad", () => "Ad");

export default (
  renderTree,
  renderTrees,
  TextComponent,
  BlockComponent
) => () => {
  it("renders a single paragraph", () => {
    const output = renderer.create(renderTree(singleParagraph)).toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders multiple paragraphs", () => {
    const output = renderer
      .create(<BlockComponent>{renderTrees(multiParagraph)}</BlockComponent>)
      .toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders multiple paragraphs with a pull quote", () => {
    const output = renderer
      .create(
        <BlockComponent>
          {renderTrees(multiParagraphWithPullQuote)}
        </BlockComponent>
      )
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
        renderTree(anchor, {
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
    const output = renderer.create(renderTree(bold)).toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders the italic tag", () => {
    const output = renderer.create(renderTree(italic)).toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders the span tag", () => {
    const output = renderer.create(renderTree(span)).toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders the line break tag", () => {
    const output = renderer.create(renderTree(lineBreak)).toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders a mixture of tags", () => {
    const output = renderer
      .create(
        renderTree(mixture, {
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
        renderTree(nested, {
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
