import React from "react";
import { AppRegistry } from "react-native-web";
import TestRenderer from "react-test-renderer";
import { addSerializers, minimalRnw } from "@times-components/jest-serializer";
import { colours, spacing } from "@times-components/styleguide";
import { iterator } from "@times-components/test-utils";
import LinkWithPressedStyle from "../../src/link-with-pressed-style.web";

addSerializers(expect, minimalRnw(AppRegistry));

require("jest-styled-components");

const tests = [
  {
    name: "Link with pressed style",
    test() {
      const style = {
        base: `
          margin-left: ${spacing(1)};
          border-radius: 9999px;
          overflow: hidden;
          text-align: center;
          line-height: 45px;
          height: 40px;
          width: 40px;
          
          &:hover {
            background-color: ${colours.functional.whiteGrey};
          }
        `
      };

      const pressedStyle = {
        base: `
          ${style.base} 
          &:hover {
            background-color: ${colours.functional.keyline};
          }
        `
      };

      const testInstance = TestRenderer.create(
        <LinkWithPressedStyle
          onPress={() => {}}
          pressedStyle={pressedStyle}
          style={style}
          url="http://thetimes.co.uk"
        >
          The Times
        </LinkWithPressedStyle>
      );

      expect(testInstance).toMatchSnapshot();
    }
  }
];

iterator(tests);
