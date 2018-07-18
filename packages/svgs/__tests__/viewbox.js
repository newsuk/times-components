import React from "react";
import TestRenderer from "react-test-renderer";
import { Svg, G, Path } from "../src";

export default () => {
  it("SVG fails if given an invalid viewBox", () => {
    const test = () =>
      TestRenderer.create(
        <Svg height={100} version="1.1" viewBox="145 50 108" width={100}>
          <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <Path d="M211.26076,54" fill="#000000" />
          </G>
        </Svg>
      );

    expect(test).toThrow();
  });
};
