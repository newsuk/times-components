const mockTpa = require("@times-components/mock-tpa-server");
const { MockArticle}  = require("@times-components/fixture-generator")

mockTpa.startWithMockData({Article: new MockArticle().withSundayTimes().withImageLeadAsset().withRelatedArticles(3).create()});

process.on("SIGTERM", () => {
  mockTpa.stop();
});
