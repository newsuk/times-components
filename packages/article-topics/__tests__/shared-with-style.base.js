import React from "react";
import TestRenderer from "react-test-renderer";
import { ContextProviderWithDefaults } from "@times-components/context";
import { scales } from "@times-components/styleguide";
import { iterator } from "@times-components/test-utils";
import ArticleTopics from "../src/article-topics";
import ArticleTopic from "../src/article-topic";
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
    },
    {
      name: "article topic with style",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleTopic
            fontSize={17}
            key="test-slug"
            lineHeight={20}
            name="Test"
            onPress={() => {}}
            slug="test-slug"
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "article topic with no additional style",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleTopic
            key="test-slug"
            name="Test"
            onPress={() => {}}
            slug="test-slug"
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
