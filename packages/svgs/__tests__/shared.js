import "react-native";
import React from "react";
import TestRenderer from "react-test-renderer";
import { Svg, G, Path, Polygon, Rect } from "../src";

export default () => {
  it("renders an SVG, G, Path", () => {
    const testInstance = TestRenderer.create(
      <Svg height={100} version="1.1" viewBox="145 50 108 120" width={100}>
        <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <Path d="M211.26076,54" fill="#000000" />
        </G>
      </Svg>
    );

    expect(testInstance).toMatchSnapshot("1. renders an SVG, G, Path");
  });

  it("renders a Path with no fill", () => {
    const testInstance = TestRenderer.create(<Path d="M211.26076,54" fill="none" />);

    expect(testInstance).toMatchSnapshot("2. renders a Path with no fill");
  });

  it("render a polygon", () => {
    const strokeColour = "red";
    const fillColour = "blue";

    const testInstance = TestRenderer.create(
      <Polygon
        fill={fillColour}
        points="16.3405361 4.14989474 16.3405361 9.66442105 22.0216082 12.8146667 22.0216082 0.999894737"
        stroke={strokeColour}
      />
    );

    expect(testInstance).toMatchSnapshot("3. render a polygon");
  });

  it("render a rect", () => {
    const testInstance = TestRenderer.create(
      <Rect
        fill="rgba(0,0,0)"
        fillOpacity="0.4"
        height="100"
        stroke="rgb(255,255,255)"
        strokeWidth="8"
        width="100"
        x="5"
        y="10"
      />
    );

    expect(testInstance).toMatchSnapshot("4. render a rect");
  });
};
