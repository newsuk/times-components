import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import ArticleExtras from "../src/article-extras";

export default () => {
  const tests = [
    {
      name: "renders correctly",
      test: () => {
        const testInstance = TestRenderer.create(<ArticleExtras />);

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    }
  ];
  iterator(tests);
};
