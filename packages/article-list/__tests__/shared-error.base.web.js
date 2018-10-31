import React from "react";
import TestRenderer from "react-test-renderer";
import Context from "@times-components/context";
import { iterator } from "@times-components/test-utils";
import ArticleListPageError from "../src/article-list-page-error";
import ArticleList from "../src/article-list";
import articlesFixture from "../fixtures/articles.json";
import adConfig from "../fixtures/article-ad-config.json";

const makeArticleUrl = ({ slug, shortIdentifier }) =>
  slug && shortIdentifier
    ? `https://www.thetimes.co.uk/article/${slug}-${shortIdentifier}`
    : "";

jest.mock("@times-components/button", () => "Button");
jest.mock("../src/article-list-item", () => ({ article }) => {
  if (article && article.id === "4e6894ec-cb18-11e7-b529-95e3fc05f40f") {
    throw new Error("test");
  }

  return "ArticleListItem";
});
jest.mock("Image", () => "Image");

export default () => {
  const tests = [
    {
      name: "page error",
      test() {
        const testInstance = TestRenderer.create(
          <ArticleListPageError refetch={() => {}} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "article list",
      test() {
        const testInstance = TestRenderer.create(
          <Context.Provider value={{ makeArticleUrl }}>
            <ArticleList
              adConfig={adConfig}
              articles={articlesFixture.slice(0, 2)}
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
