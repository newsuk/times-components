/* eslint-env jest */

import ReactNative from "react-native";
import React from "react";
import renderer from "react-test-renderer";

import Article from "../article";

describe("Article test", () => {
  it("renders native correctly", () => {
    jest.mock("WebView", () => "WebView");
    ReactNative.Platform.OS = "ios";

    const tree = renderer.create(<Article />).toJSON();
    expect(tree).toMatchSnapshot();

    jest.resetModules();
  });
});
