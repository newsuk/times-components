jest.mock("../src/tiles", () => {
  const tileMocks = {};
  Object.keys(require.requireActual("../src/tiles")).forEach(key => {
    tileMocks[key] = key;
  });
  return tileMocks;
});
jest.mock("@times-components/ts-components", () => ({
  __esModule: true,
  ...jest.requireActual("@times-components/ts-components"),
  ArticleFlags: "ArticleFlags"
}));
jest.mock("@times-components/icons", () => ({
  IconStar: "IconStar",
  TheSTLogo: "TheSTLogo",
  TheTimesLogo: "TheTimesLogo"
}));
jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/link", () => "Link");
jest.mock("@times-components/gradient", () => "Gradient");
