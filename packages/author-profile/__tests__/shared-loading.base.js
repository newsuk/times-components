import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import "./mocks";
import AuthorProfile from "../src/author-profile";

jest.mock(
  "@times-components/provider",
  () => require("./mock-loading-provider") // eslint-disable-line global-require
);
jest.mock("@times-components/tracking", () => {
  const id = x => x;

  return {
    withTrackEvents: id,
    withTrackingContext: id
  };
});

export default props => {
  const tests = [
    {
      name: "an article list loading with images",
      test() {
        const testInstance = TestRenderer.create(
          <AuthorProfile {...props} isLoading />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "an article list loading without images",
      test() {
        const testInstance = TestRenderer.create(
          <AuthorProfile {...props} isLoading />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  jest.useFakeTimers();

  iterator(tests);
};
