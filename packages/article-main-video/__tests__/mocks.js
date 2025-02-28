/* eslint-disable import/prefer-default-export */
import { mockUserState } from "@times-components/user-state";

export const UserState = mockUserState();

jest.mock("react-helmet-async", () => ({ Helmet: "Helmet" }));
// eslint-disable-next-line global-require
jest.mock("@times-components/ad", () => ({
  __esModule: true,
  AdContainer: "AdContainer"
}));
jest.mock("@times-components/ts-components", () => ({
  __esModule: true,
  ...jest.requireActual("@times-components/ts-components"),
  ArticleFlags: "ArticleFlags"
}));
jest.mock("@times-components/article-image", () => "ArticleImage");
jest.mock("@times-components/article-topics", () => "ArticleTopics");
jest.mock("@times-components/date-publication", () => "DatePublication");
jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/link", () => ({
  __esModule: true,
  default: "Link",
  TextLink: "TextLink"
}));
