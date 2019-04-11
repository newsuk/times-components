import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import SaveAndShareBar from "../src/save-and-share-bar";

jest.mock("@times-components/link", () => "Link");

jest.mock("@times-components/icons", () => ({
  IconEmail: "IconEmail",
  IconFacebook: "IconFacebook",
  IconTwitter: "IconTwitter"
}));

export default () => {
  const tests = [
    {
      name: "SaveAndShareBar renders correctly",
      test: () => {
        const testInstance = TestRenderer.create(
          <SaveAndShareBar articleUrl="" onShareOnEmail={() => {}} />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    }
  ];
  iterator(tests);
};
