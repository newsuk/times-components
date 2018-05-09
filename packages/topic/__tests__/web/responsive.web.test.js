import React from "react";
import renderer from "react-test-renderer";

import {
  HeadContainer,
  ResponsiveName,
  ResponsiveDivider
} from "../../src/styles/responsive.web";

describe("Topic responsive tests on web", () => {
  it("should render HeadContainer correctly", () => {
    expect(renderer.create(<HeadContainer />).toJSON()).toMatchSnapshot();
  });

  it("should render ResponsiveName correctly", () => {
    expect(renderer.create(<ResponsiveName />).toJSON()).toMatchSnapshot();
  });

  it("should render ResponsiveDivider correctly", () => {
    expect(renderer.create(<ResponsiveDivider />).toJSON()).toMatchSnapshot();
  });
});
