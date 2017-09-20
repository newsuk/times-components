/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Article from "../article";

const fullArticleFixture = require("../fixtures/full-article.json");
const articleFixtureNoLabel = require("../fixtures/no-label.json");
const articleFixtureNoFlags = require("../fixtures/no-flags.json");
const articleFixtureNoStandfirst = require("../fixtures/no-standfirst.json");
const articleFixtureNoStandfirstNoLabel = require("../fixtures/no-standfirst-no-label.json");
const articleFixtureNoStandfirstNoFlags = require("../fixtures/no-standfirst-no-flags.json");
const articleFixtureNoLabelNoFlags = require("../fixtures/no-label-no-flags.json");
const articleFixtureNoLabelNoFlagsNoStandFirst = require("../fixtures/no-label-no-flags-no-standfirst.json");

module.exports = () => {
  it("renders activity indicator ", () => {
    const tree = renderer.create(<Article data={{ loading: true }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders full article", () => {
    const tree = renderer.create(<Article {...fullArticleFixture} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no flags", () => {
    const tree = renderer
      .create(<Article {...articleFixtureNoFlags} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no label", () => {
    const tree = renderer
      .create(<Article {...articleFixtureNoLabel} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no standfirst", () => {
    const tree = renderer
      .create(<Article {...articleFixtureNoStandfirst} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no standfirst no flags", () => {
    const tree = renderer
      .create(<Article {...articleFixtureNoStandfirstNoFlags} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no standfirst no label", () => {
    const tree = renderer
      .create(<Article {...articleFixtureNoStandfirstNoLabel} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders article no label no flags", () => {
    const tree = renderer
      .create(<Article {...articleFixtureNoLabelNoFlags} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders article no label no flags no standfirst", () => {
    const tree = renderer
      .create(<Article {...articleFixtureNoLabelNoFlagsNoStandFirst} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
};
