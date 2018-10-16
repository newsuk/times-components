import {
  hasVideoTests,
  noArticlesTests,
  noShortHeadlineTests,
  oneArticleTests,
  twoArticlesTests,
  threeArticlesTests,
  testSummary
} from "./shared-util";
import standard0ArticleFixture from "../fixtures/standard/0-articles";
import standard1ArticleFixture from "../fixtures/standard/1-article";
import standard2ArticlesFixture from "../fixtures/standard/2-articles";
import standard3ArticlesFixture from "../fixtures/standard/3-articles";

const standard0ArticleFixtureData = standard0ArticleFixture.data;
const standard1ArticleFixtureData = standard1ArticleFixture({
  url: "https://test.io",
  crop169: "https://crop.io",
  headline: "Test Headline",
  label: "test label",
  section: "newsreview",
  shortHeadline: "Test Short Headline",
  slug: "test-slug",
  summary125: testSummary(125)
}).data;

const standardNoShortHeadlineFixtureData = standard1ArticleFixture({
  url: "https://test.io",
  crop169: "https://crop.io",
  headline: "Test Headline",
  label: "test label",
  section: "newsreview",
  shortHeadline: "",
  slug: "test-slug",
  summary125: testSummary(125)
}).data;

const standardhasVideoFixtureData = standard1ArticleFixture({
  hasVideo: true,
  slug: "test-slug"
}).data;

const standard2ArticlesFixtureData = standard2ArticlesFixture({
  firstCrop169: "https://crop1.io",
  firstHeadline: "First Headline",
  firstLabel: "first label",
  firstSection: "puzzle",
  firstShortHeadline: "First Short Headline",
  firstSlug: "test-slug",
  firstSummary125: testSummary(125),
  firstUrl: "https://first.io",
  secondCrop169: "https://crop2.io",
  secondHeadline: "Second Headline",
  secondLabel: "second label",
  secondSection: "register",
  secondShortHeadline: "Second Short Headline",
  secondSummary125: testSummary(125),
  secondUrl: "https://second.io"
}).data;

const standard3ArticlesFixtureData = standard3ArticlesFixture({
  firstCrop169: "https://crop1.io",
  firstHeadline: "First Headline",
  firstLabel: "first label",
  firstSection: "saturdayreview",
  firstShortHeadline: "First Short Headline",
  firstSlug: "test-slug",
  firstSummary125: testSummary(125),
  firstSummary145: testSummary(145),
  firstUrl: "https://first.io",
  secondCrop169: "https://crop2.io",
  secondHeadline: "Second Headline",
  secondLabel: "second label",
  secondSection: "sport",
  secondShortHeadline: "Second Short Headline",
  secondSummary125: testSummary(125),
  secondSummary145: testSummary(145),
  secondUrl: "https://second.io",
  thirdCrop169: "https://crop3.io",
  thirdHeadline: "Third Headline",
  thirdLabel: "third label",
  thirdSection: "techgames",
  thirdShortHeadline: "Third Short Headline",
  thirdSummary125: testSummary(125),
  thirdSummary145: testSummary(145),
  thirdUrl: "https://third.io"
}).data;

export const sharedNoArticles = noArticlesTests({
  fixture: standard0ArticleFixtureData
});

export const sharedNoShortHeadline = noShortHeadlineTests({
  fixture: standardNoShortHeadlineFixtureData,
  name: "no short headline"
});

export const sharedHasVideo = hasVideoTests({
  fixture: standardhasVideoFixtureData,
  name: "has video"
});

export const sharedOneArticle = oneArticleTests({
  fixture: standard1ArticleFixtureData,
  name: "a single related article"
});

export const sharedTwoArticles = twoArticlesTests({
  fixture: standard2ArticlesFixtureData,
  name: "two related articles"
});

export const sharedThreeArticles = threeArticlesTests({
  fixture: standard3ArticlesFixtureData,
  name: "three related articles"
});
