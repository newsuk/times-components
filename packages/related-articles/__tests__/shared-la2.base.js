import {
  noArticlesTests,
  oneArticleTests,
  twoArticlesTests,
  threeArticlesTests,
  testSummary
} from "./shared-util";
import leadAndTwo1ArticleFixture from "../fixtures/leadandtwo/1-article";
import leadAndTwo2ArticlesFixture from "../fixtures/leadandtwo/2-articles";
import leadAndTwo3ArticlesFixture from "../fixtures/leadandtwo/3-articles";

const leadAndTwo1ArticleFixtureData = leadAndTwo1ArticleFixture({
  crop169: "https://crop169.io",
  headline: "Test Headline",
  label: "test label",
  section: "artsfeatures",
  summary125: testSummary(125),
  url: "https://test.io"
}).data;

const leadAndTwo2ArticlesFixtureData = leadAndTwo2ArticlesFixture({
  firstCrop169: "https://crop169-1.io",
  firstHeadline: "First Headline",
  firstLabel: "first label",
  firstSection: "business",
  firstSummary125: testSummary(125),
  firstSummary175: testSummary(175),
  firstUrl: "https://first.io",
  secondCrop169: "https://crop169-2.io",
  secondHeadline: "Second Headline",
  secondLabel: "second label",
  secondSection: "bricksmortar",
  secondSummary125: testSummary(125),
  secondSummary175: testSummary(175),
  secondUrl: "https://second.io"
}).data;

const leadAndTwo3ArticlesFixtureData = leadAndTwo3ArticlesFixture({
  firstCrop169: "https://crop169-1.io",
  firstHeadline: "First Headline",
  firstLabel: "first label",
  firstSection: "culture",
  firstSummary125: testSummary(125),
  firstSummary175: testSummary(175),
  firstUrl: "https://first.io",
  secondCrop169: "https://crop169-2.io",
  secondHeadline: "Second Headline",
  secondLabel: "second label",
  secondSection: "defcon",
  secondSummary125: testSummary(125),
  secondSummary175: testSummary(175),
  secondUrl: "https://second.io",
  thirdCrop169: "https://crop169-3.io",
  thirdHeadline: "Third Headline",
  thirdLabel: "third label",
  thirdSection: "driving",
  thirdSummary125: testSummary(125),
  thirdSummary175: testSummary(175),
  thirdUrl: "https://third.io"
}).data;

export const sharedNoArticles = noArticlesTests({
  fixture: leadAndTwo1ArticleFixtureData,
  template: "LEAD_AND_TWO"
});

export const sharedOneArticle = oneArticleTests({
  fixture: leadAndTwo1ArticleFixtureData,
  name: "one lead related article"
});

export const sharedTwoArticles = twoArticlesTests({
  fixture: leadAndTwo2ArticlesFixtureData,
  name: "one lead and one support related article"
});

export const sharedThreeArticles = threeArticlesTests({
  fixture: leadAndTwo3ArticlesFixtureData,
  name: "one lead and two support related articles"
});
