/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";

const singleParagraph = require("../fixtures/single-paragraph.json").fixture;
const multiParagraph = require("../fixtures/multi-paragraph.json").fixture;
const anchor = require("../fixtures/anchor.json").fixture;
const bold = require("../fixtures/bold.json").fixture;
const italic = require("../fixtures/italic.json").fixture;
const span = require("../fixtures/span.json").fixture;
const mixture = require("../fixtures/tag-mixture.json").fixture;
const nested = require("../fixtures/nested.json").fixture;
const bio = require("../fixtures/bio.json").fixture;
const script = require("../fixtures/script.json").fixture;
const image = require("../fixtures/image.json").fixture;

export default Markup => () => {
  it("renders an empty component", () => {
    const ast = [];
    const tree = renderer.create(<Markup ast={ast} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders a single paragraph", () => {
    const tree = renderer.create(<Markup ast={singleParagraph} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders multiple paragraphs", () => {
    const tree = renderer.create(<Markup ast={multiParagraph} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders the anchor tag", () => {
    const tree = renderer.create(<Markup ast={anchor} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders the bold tag", () => {
    const tree = renderer.create(<Markup ast={bold} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders the italic tag", () => {
    const tree = renderer.create(<Markup ast={italic} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders the span tag", () => {
    const tree = renderer.create(<Markup ast={span} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders a mixture of tags", () => {
    const tree = renderer.create(<Markup ast={mixture} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders nested tags", () => {
    const tree = renderer.create(<Markup ast={nested} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders wrapped tags", () => {
    const tree = renderer.create(<Markup ast={bio} wrapIn="p" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("does not render a script tag", () => {
    const tree = renderer.create(<Markup ast={script} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("does not render an image tag", () => {
    const tree = renderer.create(<Markup ast={image} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
