import React from "react";
  import TestRenderer from "react-test-renderer";
  import { iterator } from "@times-components/test-utils";
  import SaveAndShareBar from "../src/save-and-share-bar";

  export default () => {
    const tests = [
      {
        name: "renders correctly",
        test: () => {
          const testInstance = TestRenderer.create(
            <SaveAndShareBar />
          );

          expect(testInstance.toJSON()).toMatchSnapshot();
        }
      }
    ];
    iterator(tests);
  };
