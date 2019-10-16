import React from "react";
import TestRenderer from "react-test-renderer";
import { ThemeProvider } from "newskit";
import { newskitTheme } from "@times-components/utils";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import { ContextProviderWithDefaults } from "@times-components/context";
import { UserState } from "./mocks";
import ArticleExtras from "../src/article-extras";
import { relatedArticleSlice, topics } from "../fixtures/article-extras";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) =>
          key === "style" ||
          key === "className" ||
          key === "data-testid" ||
          key === "topics" ||
          key === "slice"
      )
    )
  );

  const tests = [
    {
      name: "renders correctly",
      test: () => {
        UserState.mockStates = [UserState.fullArticle];
        const testInstance = TestRenderer.create(
          <ArticleExtras
            analyticsStream={() => {}}
            articleId="dummy-article-id"
            commentsEnabled
            registerNode={() => {}}
            relatedArticleSlice={relatedArticleSlice}
            relatedArticlesVisible
            spotAccountId="dummy-spot-id"
            topics={topics}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "renders correctly with newskit",
      test: () => {
        UserState.mockStates = [UserState.fullArticle];
        const testInstance = TestRenderer.create(
          <ContextProviderWithDefaults
            value={{
              newskit: true
            }}
          >
            <ThemeProvider theme={newskitTheme}>
              <ArticleExtras
                analyticsStream={() => {}}
                articleId="dummy-article-id"
                commentsEnabled
                registerNode={() => {}}
                relatedArticleSlice={relatedArticleSlice}
                relatedArticlesVisible
                spotAccountId="dummy-spot-id"
                topics={topics}
              />
            </ThemeProvider>
          </ContextProviderWithDefaults>
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name:
        "no related articles, topics and comments when user not logged in, only sponsored div",
      test: () => {
        UserState.mockStates = [];
        const testInstance = TestRenderer.create(
          <ArticleExtras
            analyticsStream={() => {}}
            articleId="dummy-article-id"
            commentsEnabled
            registerNode={() => {}}
            relatedArticleSlice={relatedArticleSlice}
            relatedArticlesVisible
            spotAccountId="dummy-spot-id"
            topics={topics}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    }
  ];
  iterator(tests);
};
