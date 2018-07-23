import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import { Svg, G, Path, Polygon, Rect } from "../src";

export default () => {
  const tests = [
    {
      name: "an SVG, G, Path",
      test() {
        const testInstance = TestRenderer.create(
          <Svg height={100} version="1.1" viewBox="145 50 108 120" width={100}>
            <G fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
              <Path d="M211.26076,54" fill="#000000" />
            </G>
          </Svg>
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "a Path with no fill",
      test() {
        const testInstance = TestRenderer.create(
          <Path d="M211.26076,54" fill="none" />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "a polygon",
      test() {
        const strokeColour = "red";
        const fillColour = "blue";

        const testInstance = TestRenderer.create(
          <Polygon
            fill={fillColour}
            points="16.3405361 4.14989474 16.3405361 9.66442105 22.0216082 12.8146667 22.0216082 0.999894737"
            stroke={strokeColour}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "a rect",
      test() {
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

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
