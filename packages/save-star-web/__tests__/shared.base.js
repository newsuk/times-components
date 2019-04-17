import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import SaveStarWeb from "../src/save-star-web";

export default () => {
  const tests = [
    {
      name: "renders correctly",
      test: () => {
        const testInstance = TestRenderer.create(<SaveStarWeb />);

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    }
  ];
  iterator(tests);
};
