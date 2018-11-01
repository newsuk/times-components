import React from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import Context from "@times-components/context";
import { iterator } from "@times-components/test-utils";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import { ApolloError } from "apollo-client";
import "./mocks";
import ArticleList from "../src/article-list";
import adConfig from "../fixtures/article-ad-config.json";
import { omitWeb } from "./utils";

const omitProps = new Set([
  ...omitWeb,
  "bylineProps",
  "datePublicationProps",
  "labelProps"
]);

const makeArticleUrl = ({ slug, shortIdentifier }) =>
  slug && shortIdentifier
    ? `https://www.thetimes.co.uk/article/${slug}-${shortIdentifier}`
    : "";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) => omitProps.has(key) || key.includes("Class")
      )
    )
  );

  const tests = [
    {
      name: "an error view",
      test() {
        const apolloError = new ApolloError("Test");
        const testInstance = TestRenderer.create(
          <Context.Provider value={{ makeArticleUrl }}>
            <ArticleList
              adConfig={adConfig}
              emptyStateMessage="Empty State"
              error={apolloError}
              refetch={() => {}}
            />
          </Context.Provider>
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "an error view with header",
      test() {
        const apolloError = new ApolloError("Test");
        const testInstance = TestRenderer.create(
          <Context.Provider value={{ makeArticleUrl }}>
            <ArticleList
              adConfig={adConfig}
              articleListHeader={<Text>Some Header</Text>}
              emptyStateMessage="Empty State"
              error={apolloError}
              refetch={() => {}}
            />
          </Context.Provider>
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "an empty list",
      test() {
        const testInstance = TestRenderer.create(
          <Context.Provider value={{ makeArticleUrl }}>
            <ArticleList
              adConfig={adConfig}
              articles={[]}
              emptyStateMessage="Empty state"
              refetch={() => {}}
            />
          </Context.Provider>
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "loading state",
      test() {
        const testInstance = TestRenderer.create(
          <Context.Provider value={{ makeArticleUrl }}>
            <ArticleList
              adConfig={adConfig}
              articlesLoading
              emptyStateMessage="Empty state"
              pageSize={3}
              refetch={() => {}}
            />
          </Context.Provider>
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
