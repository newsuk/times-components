import "jest-styled-components";
import React from "react";
import renderer from "react-test-renderer";
import LinkContainer from "../../src/styles/responsive";

describe("Pagination responsive tests on web", () => {
  it("should render LinkContainer correctly", () => {
    expect(renderer.create(<LinkContainer />).toJSON()).toMatchSnapshot();
  });
});
