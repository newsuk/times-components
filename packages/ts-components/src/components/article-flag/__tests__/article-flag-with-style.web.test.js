import shared from "../shared-with-style";

jest.mock("@times-components/ts-components", () => ({
  __esModule: true,
  ...jest.requireActual("@times-components/ts-components"),
  LiveArticleFlag: "LiveArticleFlag"
}));

shared();
