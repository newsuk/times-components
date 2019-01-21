import React from "react";
import TestRenderer from "react-test-renderer";
import Tile from "../src/tile";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(
      <Tile />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
