import React from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import { ApolloError } from "apollo-client";
import "./mocks";
import ArticleList from "../src/article-list";
import { omitNative } from "./utils";

const omitProps = new Set([
  ...omitNative,
  "bylineProps",
  "datePublicationProps",
  "labelProps"
]);

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => omitProps.has(key))
    )
  );

  const tests = [
    {
      name: "an error view",
      test() {
        const apolloError = new ApolloError("Test");
        const testInstance = TestRenderer.create(
          <ArticleList
            emptyStateMessage="Empty state"
            error={apolloError}
            onArticlePress={() => {}}
            refetch={() => {}}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "an error view with header",
      test() {
        const apolloError = new ApolloError("Test");
        const testInstance = TestRenderer.create(
          <ArticleList
            articleListHeader={<Text>Header</Text>}
            emptyStateMessage="Empty state"
            error={apolloError}
            onArticlePress={() => {}}
            refetch={() => {}}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "an empty list",
      test() {
        const testInstance = TestRenderer.create(
          <ArticleList
            articles={[]}
            emptyStateMessage="Empty state"
            onArticlePress={() => {}}
            refetch={() => {}}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "loading state",
      test() {
        const testInstance = TestRenderer.create(
          <ArticleList
            articlesLoading
            emptyStateMessage="Empty state"
            onArticlePress={() => {}}
            pageSize={3}
            refetch={() => {}}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
