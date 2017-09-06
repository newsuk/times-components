/* eslint-env jest */
import React from "react";
import renderer from "react-test-renderer";
import Article from "../article";

const articleFixtureFull = require("../fixtures/full-article.json");
const articleFixtureNoFlags = require("../fixtures/article-no-flags.json");
const articleFixtureNoFlagsNoStandfirst = require("../fixtures/article-no-flags-no-standfirst.json");

describe("Article test", () => {
  it("renders native correctly", () => {
    const tree = renderer.create(<Article />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders full article correctly", () => {
    const tree = renderer.create(<Article {...articleFixtureFull} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no flags", () => {
    const tree = renderer
      .create(<Article {...articleFixtureNoFlags} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no flags no standfirst", () => {
    const tree = renderer
      .create(<Article {...articleFixtureNoFlagsNoStandfirst} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
