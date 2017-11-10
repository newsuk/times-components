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
    const tree = renderer
      .create(<Article isLoading analyticsStream={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders an error", () => {
    const props = {
      error: { message: "An example error." }
    };

    const tree = renderer.create(
      <Article {...props} analyticsStream={() => {}} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders full article", () => {
    const tree = renderer
      .create(
        <Article {...fullArticleFixture.data} analyticsStream={() => {}} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no flags", () => {
    const tree = renderer
      .create(
        <Article {...articleFixtureNoFlags.data} analyticsStream={() => {}} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no label", () => {
    const tree = renderer
      .create(
        <Article {...articleFixtureNoLabel.data} analyticsStream={() => {}} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no standfirst", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoStandfirst.data}
          analyticsStream={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no standfirst no flags", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoStandfirstNoFlags.data}
          analyticsStream={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no standfirst no label", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoStandfirstNoLabel.data}
          analyticsStream={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders article no label no flags", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoLabelNoFlags.data}
          analyticsStream={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders article no label no flags no standfirst", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoLabelNoFlagsNoStandFirst.data}
          analyticsStream={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("tracks page view", () => {
    const stream = jest.fn();
    renderer.create(
      <Article {...fullArticleFixture.data} analyticsStream={stream} />
    );
    expect(stream).toHaveBeenCalledWith({
      object: "Article",
      component: "Page",
      action: "Viewed",
      attrs: expect.objectContaining({
        headline:
          "Caribbean islands devastated by Hurricane Irma, the worst Atlantic storm on record",
        byline:
          "Rosemary Bennett, Education Editor | Nicola Woolcock, Education Correspondent",
        publishedTime: "2015-03-13T18:54:58.000Z"
      })
    });
  });
};
