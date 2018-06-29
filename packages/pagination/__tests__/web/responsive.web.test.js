import "jest-styled-components";
import React from "react";
import renderer from "react-test-renderer";

import {
  ControlWrapper
} from "../../src/styles/responsive.web";

describe("Pagination responsive tests on web", () => {
  it("should render ControlWrapper correctly", () => {
    expect(renderer.create(<ControlWrapper />).toJSON()).toMatchSnapshot();
  });
});
