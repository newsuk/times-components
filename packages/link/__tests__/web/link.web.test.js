import React from "react";
import { AppRegistry } from "react-native-web";
import TestRenderer from "react-test-renderer";
import { addSerializers, minimalRnw } from "@times-components/jest-serializer";
import { colours, fonts, fontSizes } from "@times-components/styleguide";
import { iterator } from "@times-components/test-utils";
import Link from "../../src/link";
import shared from "../shared";

addSerializers(expect, minimalRnw(AppRegistry));

require("jest-styled-components");

const tests = [
  {
    name: "with responsive styles",
    test() {
      const responsiveLinkStyles = {
        base: `
        color: ${colours.functional.action};
        font-family: "${fonts.bodyRegular}";
        font-size: ${fontSizes.bodyMobile}px;
        line-height: 26px;
        margin-bottom: 25px;
        margin-top: 0;
    `,
        medium: `
        font-size: ${fontSizes.body}px;
        line-height: 30px;
    `
      };

      const testInstance = TestRenderer.create(
        <Link
          onPress={() => {}}
          responsiveLinkStyles={responsiveLinkStyles}
          url="http://thetimes.co.uk"
        >
          The Times
        </Link>
      );

      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "with a target",
    test() {
      const tree = TestRenderer.create(
        <Link onPress={() => {}} target="_blank" url="http://thetimes.co.uk">
          The Times
        </Link>
      );

      expect(tree).toMatchSnapshot();
    }
  },
  ...shared("p")
];

iterator(tests);
