import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import ArticleFlag, { ArticleFlags } from "../src/article-flag";

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
    },
    {
      name: "multiple article flags",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleFlags
            flags={[
              { expiryTime: "2030-03-13T12:00:00.000Z", type: "UPDATED" },
              { expiryTime: "2030-03-14T12:00:00.000Z", type: "EXCLUSIVE" },
              { expiryTime: "2030-03-14T12:00:00.000Z", type: "NEW" },
              { expiryTime: "2030-03-14T12:00:00.000Z", type: "SPONSORED" }
            ]}
            longRead
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
