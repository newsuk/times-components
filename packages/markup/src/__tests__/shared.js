import React from "react";
import { Text, View } from "react-native";
import renderer from "react-test-renderer";
import { renderTree, renderTrees } from "../markup";

const singleParagraph = require("../../fixtures/single-paragraph.json");
const multiParagraph = require("../../fixtures/multi-paragraph.json");
const multiParagraphWithAds = require("../../fixtures/multi-paragraph-with-ads.json");
const multiParagraphWithPullQuote = require("../../fixtures/multi-paragraph-with-pullquote.json");
const bold = require("../../fixtures/bold.json");
const italic = require("../../fixtures/italic.json");
const span = require("../../fixtures/span.json");
const lineBreak = require("../../fixtures/line-break.json");
const mixture = require("../../fixtures/tag-mixture.json");
const nested = require("../../fixtures/nested.json");
const bio = require("../../fixtures/bio.json");
const script = require("../../fixtures/script.json");
const image = require("../../fixtures/image.json");

// don't render ad internals
jest.mock("@times-components/ad", () => "Ad");

export default () => {
  it("renders a single paragraph", () => {
    const output = renderer.create(renderTree(singleParagraph)).toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders multiple paragraphs", () => {
    const output = renderer
      .create(<View>{renderTrees(multiParagraph)}</View>)
      .toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders multiple paragraphs with a pull quote", () => {
    const output = renderer
      .create(<View>{renderTrees(multiParagraphWithPullQuote)}</View>)
      .toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders multiple paragraphs with ads", () => {
    const output = renderer
      .create(<View>{renderTrees(multiParagraphWithAds)}</View>)
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
            return <View key={key}>{renderedChildren}</View>;
          },
          link(key, attributes, renderedChildren) {
            return (
              <Text key={key} href={attributes.href}>
                {renderedChildren}
              </Text>
            );
          }
        })
      )
      .toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders tags nested", () => {
    const output = renderer
      .create(
        renderTree(nested, {
          block(key, attributes, renderedChildren) {
            return <Text key={key}>{renderedChildren}</Text>;
          }
        })
      )
      .toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders wrapped tags", () => {
    const output = renderer.create(<Text>{renderTrees(bio)}</Text>).toJSON();

    expect(output).toMatchSnapshot();
  });

  it("renders multiple children", () => {
    const output = renderer
      .create(
        <Text style={{ color: "red" }}>{renderTrees(multiParagraph)}</Text>
      )
      .toJSON();

    expect(output).toMatchSnapshot();
  });

  it("does not render a script tag", () => {
    const output = renderer.create(<View>{renderTrees(script)}</View>).toJSON();

    expect(output).toMatchSnapshot();
  });

  it("does not render an image tag", () => {
    const output = renderer.create(<View>{renderTrees(image)}</View>).toJSON();

    expect(output).toMatchSnapshot();
  });
};
