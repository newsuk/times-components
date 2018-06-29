import "jest-styled-components";
import React from "react";
import renderer from "react-test-renderer";

import {
  ResponsiveControlWrapper
} from "../../src/styles/responsive.web";

describe("Pagination responsive tests on web", () => {
  it("should render ResponsiveControlWrapper correctly", () => {
    expect(renderer.create(<ResponsiveControlWrapper />).toJSON()).toMatchSnapshot();
  });
});
