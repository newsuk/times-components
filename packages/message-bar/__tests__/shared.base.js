import React from "react";
  import TestRenderer from "react-test-renderer";
  import { iterator } from "@times-components/test-utils";
  import MessageBar from "../src/message-bar";

  export default () => {
    const tests = [
      {
        name: "renders correctly",
        test: () => {
          const testInstance = TestRenderer.create(
            <MessageBar />
          );

          expect(testInstance.toJSON()).toMatchSnapshot();
        }
      }
    ];
    iterator(tests);
  };
