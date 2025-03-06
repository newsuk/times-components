/* eslint-disable import/prefer-default-export */
import React from "react";
import { mockUserState } from "@times-components/user-state";

export const UserState = mockUserState();

jest.mock("@times-components/article-comments", () => "ArticleComments");
jest.mock("@times-components/article-topics", () => "ArticleTopics");
jest.mock("@times-components/related-articles", () => "RelatedArticles");
jest.mock("@times-components/ts-components", () => ({
  __esModule: true,
  ...jest.requireActual("@times-components/ts-components"),
  RelatedArticleSlice: "RelatedArticleSlice",
  RecommendedFetch: () => <div>RecommendedFetch</div>
}));
