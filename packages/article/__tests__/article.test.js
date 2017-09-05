/* eslint-env jest */

import ReactNative from "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Article from "../article";

const articleFixtureFull = require("../fixtures/full-article.json");
const articleFixtureNoFlags = require("../fixtures/article-no-flags.json");
const articleFixtureNoFlagsNoStandfirst = require("../fixtures/article-no-flags-no-standfirst.json");

describe("Article test", () => {
  it("renders native correctly", () => {
    jest.mock("WebView", () => "WebView");
    ReactNative.Platform.OS = "ios";

    const tree = renderer.create(<Article />).toJSON();
    expect(tree).toMatchSnapshot();

    jest.resetModules();
  });

  it("renders full article correctly", () => {
    jest.mock("WebView", () => "WebView");
    ReactNative.Platform.OS = "ios";

    const tree = renderer.create(<Article {...articleFixtureFull} />).toJSON();
    expect(tree).toMatchSnapshot();

    jest.resetModules();
  });

  it("renders article no flags", () => {
    jest.mock("WebView", () => "WebView");
    ReactNative.Platform.OS = "ios";

    const tree = renderer
      .create(<Article {...articleFixtureNoFlags} />)
      .toJSON();
    expect(tree).toMatchSnapshot();

    jest.resetModules();
  });

  it("renders article no flags no standfirst", () => {
    jest.mock("WebView", () => "WebView");
    ReactNative.Platform.OS = "ios";

    const tree = renderer
      .create(<Article {...articleFixtureNoFlagsNoStandfirst} />)
      .toJSON();
    expect(tree).toMatchSnapshot();

    jest.resetModules();
  });
});
