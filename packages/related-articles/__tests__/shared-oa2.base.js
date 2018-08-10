import {
  noArticlesTests,
  oneArticleTests,
  twoArticlesTests,
  threeArticlesTests,
  testSummary
} from "./shared-util";
import opinionAndTwo1ArticleFixture from "../fixtures/opinionandtwo/1-article";
import opinionAndTwo2ArticlesFixture from "../fixtures/opinionandtwo/2-articles";
import opinionAndTwo3ArticlesFixture from "../fixtures/opinionandtwo/3-articles";

const opinionAndTwo1ArticleFixtureData = opinionAndTwo1ArticleFixture({
  url: "https://test.io",
  crop23: "https://crop23.io",
  crop169: "https://crop169.io",
  headline: "Test Headline",
  label: "test label",
  section: "gardening",
  summary125: testSummary(125),
  summary145: testSummary(145),
  summary160: testSummary(160),
  summary225: testSummary(225)
}).data;

const opinionAndTwo2ArticlesFixtureData = opinionAndTwo2ArticlesFixture({
  firstCrop23: "https://crop23-1.io",
  firstCrop169: "https://crop169-1.io",
  firstHeadline: "First Headline",
  firstLabel: "first label",
  firstSection: "home",
  firstSummary125: testSummary(125),
  firstSummary145: testSummary(145),
  firstSummary160: testSummary(160),
  firstSummary225: testSummary(225),
  firstUrl: "https://first.io",
  secondCrop23: "https://crop23-2.io",
  secondCrop169: "https://crop169-2.io",
  secondHeadline: "Second Headline",
  secondLabel: "second label",
  secondSection: "ireland",
  secondSummary125: testSummary(125),
  secondSummary145: testSummary(145),
  secondSummary160: testSummary(160),
  secondSummary225: testSummary(225),
  secondUrl: "https://second.io"
}).data;

const opinionAndTwo3ArticlesFixtureData = opinionAndTwo3ArticlesFixture({
  firstCrop23: "https://crop23-1.io",
  firstCrop169: "https://crop169-1.io",
  firstHeadline: "First Headline",
  firstLabel: "first label",
  firstSection: "law",
  firstSummary125: testSummary(125),
  firstSummary145: testSummary(145),
  firstSummary160: testSummary(160),
  firstSummary225: testSummary(225),
  firstUrl: "https://first.io",
  secondCrop23: "https://crop23-2.io",
  secondCrop169: "https://crop169-2.io",
  secondHeadline: "Second Headline",
  secondLabel: "second label",
  secondSection: "leaders",
  secondSummary125: testSummary(125),
  secondSummary145: testSummary(145),
  secondSummary160: testSummary(160),
  secondSummary225: testSummary(225),
  secondUrl: "https://second.io",
  thirdCrop23: "https://crop23-3.io",
  thirdCrop169: "https://crop169-3.io",
  thirdHeadline: "Third Headline",
  thirdLabel: "third label",
  thirdSection: "money",
  thirdSummary125: testSummary(125),
  thirdSummary145: testSummary(145),
  thirdSummary160: testSummary(160),
  thirdSummary225: testSummary(225),
  thirdUrl: "https://third.io"
}).data;

export const sharedNoArticles = noArticlesTests({
  fixture: opinionAndTwo1ArticleFixtureData,
  template: "OPINION_AND_TWO"
});

export const sharedOneArticle = oneArticleTests({
  fixture: opinionAndTwo1ArticleFixtureData,
  name: "one opinion related article"
});

export const sharedTwoArticles = twoArticlesTests({
  fixture: opinionAndTwo2ArticlesFixtureData,
  name: "one opinion and one support related article"
});

export const sharedThreeArticles = threeArticlesTests({
  fixture: opinionAndTwo3ArticlesFixtureData,
  name: "one opinion and two support related articles"
});
