import React from "react";
import TestRenderer from "react-test-renderer";
import { ContextProviderWithDefaults } from "@times-components/context";
import { scales } from "@times-components/styleguide";
import { iterator } from "@times-components/test-utils";
import ArticleTopics from "../src/article-topics";
import topicData from "../fixtures/topics";

export default () => {
  const tests = [
    {
      name: "group of topics",
      test: () => {
        const scale = scales.medium;
        const testInstance = TestRenderer.create(
          <ContextProviderWithDefaults value={{ theme: { scale } }}>
            <ArticleTopics onPress={() => {}} topics={topicData.slice(0, 1)} />
          </ContextProviderWithDefaults>
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "group of topics at large scale",
      test: () => {
        const scale = scales.large;
        const testInstance = TestRenderer.create(
          <ContextProviderWithDefaults value={{ theme: { scale } }}>
            <ArticleTopics onPress={() => {}} topics={topicData.slice(0, 1)} />
          </ContextProviderWithDefaults>
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "group of topics at xlarge scale",
      test: () => {
        const scale = scales.xlarge;
        const testInstance = TestRenderer.create(
          <ContextProviderWithDefaults value={{ theme: { scale } }}>
            <ArticleTopics onPress={() => {}} topics={topicData.slice(0, 1)} />
          </ContextProviderWithDefaults>
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
