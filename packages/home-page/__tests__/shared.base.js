import React from "react";
  import TestRenderer from "react-test-renderer";
  import { iterator } from "@times-components/test-utils";
  import HomePage from "../src/home-page";

  export default () => {
    const tests = [
      {
        name: "renders correctly",
        test: () => {
          const testInstance = TestRenderer.create(
            <HomePage />
          );

          expect(testInstance.toJSON()).toMatchSnapshot();
        }
      }
    ];
    iterator(tests);
  };
