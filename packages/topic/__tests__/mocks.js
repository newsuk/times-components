jest.mock("react-helmet-async", () => ({ Helmet: "Helmet" }));

jest.mock("@times-components-native/article-list", () =>
  // eslint-disable-next-line global-require
  require("./mock-article-list")
);
jest.mock("@times-components-native/gradient", () => "Gradient");
jest.mock("@times-components-native/pagination", () => {
  const id = x => x;

  return {
    withPageState: id
  };
});
