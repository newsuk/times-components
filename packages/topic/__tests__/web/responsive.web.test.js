import "jest-styled-components";
import React from "react";
import renderer from "react-test-renderer";

import {
  getHeadContainer,
  ResponsiveName,
  ResponsiveDivider
} from "../../src/styles/responsive.web";

describe("Topic responsive tests on web", () => {
  it("should render HeadContainer correctly", () => {
    let HeadContainer = getHeadContainer({ hasDescription: true });
    expect(renderer.create(<HeadContainer />).toJSON()).toMatchSnapshot();
    HeadContainer = getHeadContainer({ hasDescription: false });
    expect(renderer.create(<HeadContainer />).toJSON()).toMatchSnapshot();
  });

  it("should render ResponsiveName correctly", () => {
    expect(renderer.create(<ResponsiveName />).toJSON()).toMatchSnapshot();
  });

  it("should render ResponsiveDivider correctly", () => {
    expect(renderer.create(<ResponsiveDivider />).toJSON()).toMatchSnapshot();
  });
});
