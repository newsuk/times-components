import React from "react";
import TestRenderer from "react-test-renderer";
import { mockNativeModules } from "@times-components-native/mocks";
import { iterator } from "@times-components-native/test-utils";
import mockDate from "mockdate";
import "./mocks";
import Topic from "../src/topic";

mockNativeModules();
// eslint-disable-next-line global-require
jest.mock("@times-components-native/provider", () => require("./mock-provider"));

export default props => {
  const tests = [
    {
      name: "tracking information",
      test() {
        const analyticsStream = jest.fn();

        TestRenderer.create(
          <Topic
            {...props}
            analyticsStream={analyticsStream}
            isLoading={false}
            page={2}
          />
        );

        expect(analyticsStream.mock.calls).toMatchSnapshot();
      }
    }
  ];

  jest.useFakeTimers();

  beforeEach(() => {
    mockDate.set(1514764800000, 0);
  });

  afterEach(() => {
    mockDate.reset();
  });

  iterator(tests);
};
