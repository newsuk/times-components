import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import ResponsiveStyledComponentsNative from "../src/responsive-styled-components-native";

export default () => {
  const tests = [
    {
      name: "renders correctly",
      test: () => {
        const testInstance = TestRenderer.create(
          <ResponsiveStyledComponentsNative />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    }
  ];
  iterator(tests);
};
