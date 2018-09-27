import React from "react";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import TestRenderer from "react-test-renderer";
import "./mocks";
import { omitWeb as omitProps } from "./utils";
import articlesFixture from "../fixtures/articles.json";
import adConfig from "../fixtures/article-ad-config.json";
import ArticleList from "../src/article-list";
import shared from "./shared.base.web";

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
      name: "article list with no images",
      test() {
        const testInstance = TestRenderer.create(
          <ArticleList
            adConfig={adConfig}
            articles={articlesFixture.slice(0, 1)}
            emptyStateMessage="Empty state"
            pageSize={3}
            refetch={() => {}}
            showImages={false}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "article list with missing image",
      test() {
        const [article] = articlesFixture;
        const missingImage = {
          ...article,
          leadAsset: {
            title: "Lead 1",
            crop: {}
          }
        };

        const testInstance = TestRenderer.create(
          <ArticleList
            adConfig={adConfig}
            articles={[missingImage]}
            emptyStateMessage="Empty state"
            pageSize={3}
            refetch={() => {}}
            showImages={false}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  shared(tests);
};
