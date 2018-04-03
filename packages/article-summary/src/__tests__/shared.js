import React from "react";
import renderer from "react-test-renderer";
import ArticleSummary, {
  ArticleSummaryContent,
  summarise
} from "../article-summary";
import defaultFixture from "../../fixtures/default";
import opinionBylineFixture from "../../fixtures/opinion-byline";
import articleMultiFixture from "../../fixtures/article-multi";
import emptyParagraphFixture from "../../fixtures/article-empty-paragraph";
import noBylineFixture from "../../fixtures/no-byline";
import noLabelFixture from "../../fixtures/no-label";
import reviewFixture from "../../fixtures/review";
import blankFixture from "../../fixtures/blank";
import noContentFixture from "../../fixtures/no-content";
import noHeadline from "../../fixtures/no-headline";
import noDatePublication from "../../fixtures/no-datepublication";

export default () => {
  const realIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  it("renders an article-summary component with a single paragraph", () => {
    const tree = renderer
      .create(<ArticleSummary {...defaultFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary with opinion byline", () => {
    const tree = renderer
      .create(<ArticleSummary {...opinionBylineFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with multiple paragraphs", () => {
    const tree = renderer
      .create(<ArticleSummary {...articleMultiFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with content including line breaks", () => {
    const tree = renderer
      .create(<ArticleSummary {...reviewFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with headline and blank content", () => {
    const tree = renderer.create(<ArticleSummary {...blankFixture} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with headline and no content", () => {
    const tree = renderer
      .create(<ArticleSummary {...noContentFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with empty content at the end trimmed", () => {
    const tree = renderer
      .create(<ArticleSummary {...emptyParagraphFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with no byline", () => {
    const tree = renderer
      .create(<ArticleSummary {...noBylineFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with no label", () => {
    const tree = renderer
      .create(<ArticleSummary {...noLabelFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with no headline", () => {
    const tree = renderer.create(<ArticleSummary {...noHeadline} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with no date publication", () => {
    const tree = renderer
      .create(<ArticleSummary {...noDatePublication} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an ArticleSummaryContent component with a blank AST", () => {
    const tree = renderer.create(<ArticleSummaryContent ast={[]} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("summarise should return the value provided if its an empty array", () => {
    expect(summarise([])).toEqual([]);
  });

  it("summarise should return [] if it has no parameters", () => {
    expect(summarise()).toEqual([]);
  });
};
