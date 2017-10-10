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
    const tree = renderer.create(<Article isLoading={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders an error", () => {
    const props = {
      error: { message: "An example error." }
    };

    const tree = renderer.create(<Article {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("renders full article", () => {
    const tree = renderer
      .create(<Article {...fullArticleFixture.data} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no flags", () => {
    const tree = renderer
      .create(<Article {...articleFixtureNoFlags.data} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no label", () => {
    const tree = renderer
      .create(<Article {...articleFixtureNoLabel.data} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no standfirst", () => {
    const tree = renderer
      .create(<Article {...articleFixtureNoStandfirst.data} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no standfirst no flags", () => {
    const tree = renderer
      .create(<Article {...articleFixtureNoStandfirstNoFlags.data} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no standfirst no label", () => {
    const tree = renderer
      .create(<Article {...articleFixtureNoStandfirstNoLabel.data} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders article no label no flags", () => {
    const tree = renderer
      .create(<Article {...articleFixtureNoLabelNoFlags.data} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders article no label no flags no standfirst", () => {
    const tree = renderer
      .create(<Article {...articleFixtureNoLabelNoFlagsNoStandFirst.data} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
};
