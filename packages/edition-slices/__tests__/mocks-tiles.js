jest.mock("@times-components/ts-components", () => ({
  __esModule: true,
  ...jest.requireActual("@times-components/ts-components"),
  ArticleFlags: "ArticleFlags"
}));
jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/link", () => "Link");
jest.mock("@times-components/gradient", () => "Gradient");
jest.mock("@times-components/article-label", () => "ArticleLabel");
