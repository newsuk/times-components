import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import ArticleTopics from "../src/article-topics";
import topicData from "../fixtures/topics";

export default () => {
  const tests = [
    {
      name: "group of topics",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleTopics onPress={() => {}} topics={topicData.slice(0, 1)} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
