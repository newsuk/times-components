import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import {
  ListContentContainer,
  ListItemWrapper,
  ListItemLongText,
  ListItemShortText,
  PageErrorContainer,
  PageErrorImageContainer
} from "../../src/styles/responsive";

describe("ArticleList responsive tests on web", () => {
  it("should render ListContentContainer correctly", () => {
    expect(
      renderer.create(<ListContentContainer />).toJSON()
    ).toMatchSnapshot();
  });

  it("should render ListItemWrapper correctly", () => {
    expect(renderer.create(<ListItemWrapper />).toJSON()).toMatchSnapshot();
  });

  it("should render ListItemLongText correctly", () => {
    expect(renderer.create(<ListItemLongText />).toJSON()).toMatchSnapshot();
  });

  it("should render ListItemShortText correctly", () => {
    expect(renderer.create(<ListItemShortText />).toJSON()).toMatchSnapshot();
  });

  it("should render PageErrorContainer correctly", () => {
    expect(renderer.create(<PageErrorContainer />).toJSON()).toMatchSnapshot();
  });

  it("should render PageErrorImageContainer correctly", () => {
    expect(
      renderer.create(<PageErrorImageContainer />).toJSON()
    ).toMatchSnapshot();
  });
});
