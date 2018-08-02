jest.mock("@times-components/article-list", () =>
  // eslint-disable-next-line global-require
  require("./mock-article-list")
);
jest.mock("@times-components/gradient", () => "Gradient");
jest.mock("@times-components/icons", () => ({
  IconTwitter: "IconTwitter"
}));
jest.mock("@times-components/image", () => "Image");
jest.mock("@times-components/link", () => ({
  TextLink: "TextLink"
}));
jest.mock("@times-components/pagination", () => {
  const id = x => x;

  return {
    withPageState: id
  };
});
