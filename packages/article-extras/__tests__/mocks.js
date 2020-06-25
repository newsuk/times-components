/* eslint-disable import/prefer-default-export */

import { mockUserState } from "@times-components-native/user-state";

export const UserState = mockUserState();

jest.mock("@times-components-native/article-comments", () => "ArticleComments");
jest.mock("@times-components-native/article-topics", () => "ArticleTopics");
jest.mock("@times-components-native/related-articles", () => "RelatedArticles");
