import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import ArticleFlag from "../src/article-flag";

export default () => {
  const tests = [
    {
      name: "red article flag",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleFlag color="red" title="Coloured Red" />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
