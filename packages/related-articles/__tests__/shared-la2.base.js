import util, { testSummary } from "./shared-util";
import leadAndTwo1ArticleFixture from "../fixtures/leadandtwo/1-article";
import leadAndTwo2ArticlesFixture from "../fixtures/leadandtwo/2-articles";
import leadAndTwo3ArticlesFixture from "../fixtures/leadandtwo/3-articles";

const leadAndTwo1ArticleFixtureData = leadAndTwo1ArticleFixture({
  crop169: "https://crop169.io",
  headline: "Test Headline",
  summary125: testSummary(125),
  url: "https://test.io"
}).data;

const leadAndTwo2ArticlesFixtureData = leadAndTwo2ArticlesFixture({
  firstCrop169: "https://crop169-1.io",
  firstHeadline: "First Headline",
  firstSummary125: testSummary(125),
  firstSummary175: testSummary(175),
  firstUrl: "https://first.io",
  secondCrop169: "https://crop169-2.io",
  secondHeadline: "Second Headline",
  secondSummary125: testSummary(125),
  secondSummary175: testSummary(175),
  secondUrl: "https://second.io"
}).data;

const leadAndTwo3ArticlesFixtureData = leadAndTwo3ArticlesFixture({
  firstCrop169: "https://crop169-1.io",
  firstHeadline: "First Headline",
  firstSummary125: testSummary(125),
  firstSummary175: testSummary(175),
  firstUrl: "https://first.io",
  secondCrop169: "https://crop169-2.io",
  secondHeadline: "Second Headline",
  secondSummary125: testSummary(125),
  secondSummary175: testSummary(175),
  secondUrl: "https://second.io",
  thirdCrop169: "https://crop169-3.io",
  thirdHeadline: "Third Headline",
  thirdSummary125: testSummary(125),
  thirdSummary175: testSummary(175),
  thirdUrl: "https://third.io"
}).data;

export default util({
  fixture1: leadAndTwo1ArticleFixtureData,
  fixture2: leadAndTwo2ArticlesFixtureData,
  fixture3: leadAndTwo3ArticlesFixtureData,
  one: "one lead related article",
  three: "one lead and two support related articles",
  template: "OPINION_AND_TWO",
  two: "one lead and one support related article"
});
