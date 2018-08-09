import util, { testSummary } from "./shared-util";
import opinionAndTwo1ArticleFixture from "../fixtures/opinionandtwo/1-article";
import opinionAndTwo2ArticlesFixture from "../fixtures/opinionandtwo/2-articles";
import opinionAndTwo3ArticlesFixture from "../fixtures/opinionandtwo/3-articles";

const opinionAndTwo1ArticleFixtureData = opinionAndTwo1ArticleFixture({
  url: "https://test.io",
  crop23: "https://crop23.io",
  crop169: "https://crop169.io",
  headline: "Test Headline",
  shortHeadline: "Test Short Headline",
  summary125: testSummary(125),
  summary145: testSummary(145),
  summary160: testSummary(160),
  summary225: testSummary(225)
}).data;

const opinionAndTwo1ArticleNoShortHeadlineFixtureData = opinionAndTwo1ArticleFixture(
  {
    url: "https://test.io",
    crop23: "https://crop23.io",
    crop169: "https://crop169.io",
    headline: "Test Headline",
    shortHeadline: "",
    summary125: testSummary(125),
    summary145: testSummary(145),
    summary160: testSummary(160),
    summary225: testSummary(225)
  }
).data;

const opinionAndTwo2ArticlesFixtureData = opinionAndTwo2ArticlesFixture({
  firstCrop23: "https://crop23-1.io",
  firstCrop169: "https://crop169-1.io",
  firstHeadline: "First Headline",
  firstShortHeadline: "First Short Headline",
  firstSummary125: testSummary(125),
  firstSummary145: testSummary(145),
  firstSummary160: testSummary(160),
  firstSummary225: testSummary(225),
  firstUrl: "https://first.io",
  secondCrop23: "https://crop23-2.io",
  secondCrop169: "https://crop169-2.io",
  secondHeadline: "Second Headline",
  secondShortHeadline: "Second Short Headline",
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
  firstShortHeadline: "First Short Headline",
  firstSummary125: testSummary(125),
  firstSummary145: testSummary(145),
  firstSummary160: testSummary(160),
  firstSummary225: testSummary(225),
  firstUrl: "https://first.io",
  secondCrop23: "https://crop23-2.io",
  secondCrop169: "https://crop169-2.io",
  secondHeadline: "Second Headline",
  secondShortHeadline: "Second Short Headline",
  secondSummary125: testSummary(125),
  secondSummary145: testSummary(145),
  secondSummary160: testSummary(160),
  secondSummary225: testSummary(225),
  secondUrl: "https://second.io",
  thirdCrop23: "https://crop23-3.io",
  thirdCrop169: "https://crop169-3.io",
  thirdHeadline: "Third Headline",
  thirdShortHeadline: "Third Short Headline",
  thirdSummary125: testSummary(125),
  thirdSummary145: testSummary(145),
  thirdSummary160: testSummary(160),
  thirdSummary225: testSummary(225),
  thirdUrl: "https://third.io"
}).data;

export default util({
  fixture1: opinionAndTwo1ArticleFixtureData,
  fixture2: opinionAndTwo2ArticlesFixtureData,
  fixture3: opinionAndTwo3ArticlesFixtureData,
  fixture4: opinionAndTwo1ArticleNoShortHeadlineFixtureData,
  one: "one opinion related article",
  three: "opinion and two support related articles",
  template: "OPINION_AND_TWO",
  two: "one opinion and one support related article"
});
