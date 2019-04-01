import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import StarButton from "../src/star-button";

jest.mock("@times-components/link", () => "Link");

jest.mock("@times-components/icons", () => ({
  IconStar: "IconStar"
}));

export default () => {
  const tests = [
    {
      name: "renders default",
      test: () => {
        const testInstance = TestRenderer.create(
          <StarButton onPress={() => {}} />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "renders selected",
      test: () => {
        const testInstance = TestRenderer.create(
          <StarButton onPress={() => {}} selected />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "renders disabled",
      test: () => {
        const testInstance = TestRenderer.create(
          <StarButton disabled onPress={() => {}} />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
