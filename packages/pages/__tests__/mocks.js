// eslint-disable-next-line global-require
jest.mock("@times-components/article", () => "Article");
jest.mock("react-native", () => {
  const rn = require.requireActual("react-native");
  rn.NativeModules.ArticleEvents = {
    onArticleLoaded: () => {},
    onArticlePress: () => {},
    onAuthorPress: () => {},
    onCommentGuidelinesPress: () => {},
    onCommentsPress: () => {},
    onLinkPress: () => {},
    onTopicPress: () => {},
    onVideoPress: () => {},
    refetch: () => {}
  };
  rn.NativeModules.AuthorProfileEvents = {
    onArticlePress: () => {}
  };
  rn.NativeModules.NativeFetch = { fetch: () => {} };
  rn.NativeModules.ReactAnalytics = { track: () => {} };
  rn.NativeModules.ReactConfig = {
    adNetworkId: "dummy-ad-network-id",
    cookieEid: "dummy-cookie-eid",
    deviceId: "dummy-device-id",
    graphqlEndPont: "dummy-end-point",
    operatingSystemVersion: "123"
  };
  rn.NativeModules.SectionEvents = {
    getOpenedPuzzleCount: jest.fn(),
    getSavedArticles: jest.fn().mockReturnValue(Promise.resolve([])),
    getSectionData: jest.fn().mockReturnValue(Promise.resolve("{}")),
    onArticlePress: () => {},
    onArticleSavePress: jest.fn().mockReturnValue(Promise.resolve(true)),
    onPuzzleBarPress: () => {},
    onPuzzlePress: () => {},
    onSectionLoaded: () => {}
  };
  rn.NativeModules.TopicEvents = {
    onArticlePress: () => {}
  };
  return rn;
});
