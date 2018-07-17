import util, { testSummary } from "./shared-util";
import standard1ArticleFixture from "../fixtures/standard/1-article";
import standard2ArticlesFixture from "../fixtures/standard/2-articles";
import standard3ArticlesFixture from "../fixtures/standard/3-articles";

const standard1ArticleFixtureData = standard1ArticleFixture({
  url: "https://test.io",
  crop169: "https://crop.io",
  headline: "Test Headline",
  summary125: testSummary(125)
}).data;

const standard2ArticlesFixtureData = standard2ArticlesFixture({
  firstCrop169: "https://crop1.io",
  firstHeadline: "First Headline",
  firstSummary125: testSummary(125),
  firstUrl: "https://first.io",
  secondCrop169: "https://crop2.io",
  secondHeadline: "Second Headline",
  secondSummary125: testSummary(125),
  secondUrl: "https://second.io"
}).data;

const standard3ArticlesFixtureData = standard3ArticlesFixture({
  firstCrop169: "https://crop1.io",
  firstHeadline: "First Headline",
  firstSummary125: testSummary(125),
  firstSummary145: testSummary(145),
  firstUrl: "https://first.io",
  secondCrop169: "https://crop2.io",
  secondHeadline: "Second Headline",
  secondSummary125: testSummary(125),
  secondSummary145: testSummary(145),
  secondUrl: "https://second.io",
  thirdCrop169: "https://crop3.io",
  thirdHeadline: "Third Headline",
  thirdSummary125: testSummary(125),
  thirdSummary145: testSummary(145),
  thirdUrl: "https://third.io"
}).data;

export default util({
  fixture1: standard1ArticleFixtureData,
  fixture2: standard2ArticlesFixtureData,
  fixture3: standard3ArticlesFixtureData,
  one: "a single related article",
  three: "three related articles",
  template: "DEFAULT",
  two: "two related articles"
});
