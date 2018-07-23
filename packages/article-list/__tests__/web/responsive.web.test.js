import React from "react";
import TestRenderer from "react-test-renderer";
import {
  ListContentContainer,
  ListItemWrapper,
  ListItemLongText,
  ListItemShortText,
  ListItemSeparator,
  PageErrorContainer,
  PageErrorImageContainer,
  PageErrorContentContainer
} from "../../src/styles/responsive";

describe("ArticleList responsive tests on web", () => {
  it("should render ListContentContainer correctly", () => {
    expect(
      TestRenderer.create(<ListContentContainer />).toJSON()
    ).toMatchSnapshot();
  });

  it("should render ListItemWrapper correctly", () => {
    expect(TestRenderer.create(<ListItemWrapper />).toJSON()).toMatchSnapshot();
  });

  it("should render ListItemLongText correctly", () => {
    expect(
      TestRenderer.create(<ListItemLongText />).toJSON()
    ).toMatchSnapshot();
  });

  it("should render ListItemShortText correctly", () => {
    expect(
      TestRenderer.create(<ListItemShortText />).toJSON()
    ).toMatchSnapshot();
  });

  it("should render ListItemSeparator correctly", () => {
    expect(
      TestRenderer.create(<ListItemSeparator />).toJSON()
    ).toMatchSnapshot();
  });

  it("should render PageErrorContainer correctly", () => {
    expect(
      TestRenderer.create(<PageErrorContainer />).toJSON()
    ).toMatchSnapshot();
  });

  it("should render PageErrorImageContainer correctly", () => {
    expect(
      TestRenderer.create(<PageErrorImageContainer />).toJSON()
    ).toMatchSnapshot();
  });

  it("should render PageErrorContentContainer correctly", () => {
    expect(
      TestRenderer.create(<PageErrorContentContainer />).toJSON()
    ).toMatchSnapshot();
  });
});
