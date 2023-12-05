import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import ArticleSummaryStrapline from "../src/article-summary-strapline";
import ArticleSummaryHeadline from "../src/article-summary-headline";

const text = "PM hails breakthrough ahead of key Commons vote";
const style = { color: "black" };

export default () => {
  const tests = [
    {
      name: "article summary headline component",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleSummaryHeadline
            className="bigOne"
            headline={text}
            style={style}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "article summary strapline component",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleSummaryStrapline strapline={text} style={style} />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
