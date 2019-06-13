/* eslint-disable import/prefer-default-export */

import { mockUserState } from "@times-components/user-state";

export const UserState = mockUserState();

jest.mock("@times-components/article-comments", () => "ArticleComments");
jest.mock("@times-components/article-topics", () => "ArticleTopics");
jest.mock("@times-components/related-articles", () => "RelatedArticles");
