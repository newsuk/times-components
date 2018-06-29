import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleSummary, { renderAst } from "../src/article-summary";
import defaultFixture from "../fixtures/default";
import withSummaryLinksFixture from "../fixtures/with-summary-links";
import opinionBylineFixture from "../fixtures/opinion-byline";
import articleMultiFixture from "../fixtures/article-multi";
import emptyParagraphFixture from "../fixtures/article-empty-paragraph";
import noBylineFixture from "../fixtures/no-byline";
import noLabelFixture from "../fixtures/no-label";
import reviewFixture from "../fixtures/review";
import blankFixture from "../fixtures/blank";
import noHeadline from "../fixtures/no-headline";
import noDatePublication from "../fixtures/no-datepublication";
import videoLabelFixture from "../fixtures/video-label";

jest.mock("@times-components/article-byline", () => "ArticleByline");
jest.mock("@times-components/article-label", () => "ArticleLabel");
jest.mock("@times-components/date-publication", () => "DatePublication");
jest.mock("@times-components/video-label", () => "VideoLabel");

export default () => {
  const byline = "A byline";
  const headline = "Test Headline";
  const label = "Test label";
  const paragraph = "Test paragraph";
  const paragraph1 = "Test paragraph 1.";
  const paragraph2 = "Test paragraph 2";

  it("should render an article summary component with a single paragraph", () => {
    const testInstance = TestRenderer.create(
      <ArticleSummary
        {...defaultFixture({
          headline,
          label,
          paragraph
        })}
      />
    );

    expect(testInstance.toJSON()).toMatchSnapshot(
      "1. should render an article summary component with a single paragraph"
    );
  });

  it("should render an article summary with opinion byline", () => {
    const testInstance = TestRenderer.create(
      <ArticleSummary
        {...opinionBylineFixture({
          byline,
          headline,
          label,
          paragraph
        })}
      />
    );

    expect(testInstance.toJSON()).toMatchSnapshot(
      "2. should render an article summary with opinion byline"
    );
  });

  it("should render an article summary component with multiple paragraphs", () => {
    const testInstance = TestRenderer.create(
      <ArticleSummary
        {...articleMultiFixture({
          byline,
          headline,
          label,
          paragraph1,
          paragraph2
        })}
      />
    );

    expect(testInstance.toJSON()).toMatchSnapshot(
      "3. should render an article summary component with multiple paragraphs"
    );
  });

  it("should render an article summary component with content including line breaks", () => {
    const testInstance = TestRenderer.create(
      <ArticleSummary
        {...reviewFixture({
          headline,
          label,
          review1Title: "Review 1",
          review2Title: "Review 2",
          paragraph
        })}
      />
    );

    expect(testInstance.toJSON()).toMatchSnapshot(
      "4. should render an article summary component with content including line breaks"
    );
  });

  it("should render an article summary component containing links", () => {
    const testInstance = TestRenderer.create(
      <ArticleSummary
        {...withSummaryLinksFixture({
          headline,
          label
        })}
      />
    );

    expect(testInstance.toJSON()).toMatchSnapshot(
      "5. should render an article summary component containing links"
    );
  });

  it("should render an article summary component with headline and no content", () => {
    const testInstance = TestRenderer.create(
      <ArticleSummary
        {...blankFixture({
          headline,
          label
        })}
      />
    );

    expect(testInstance.toJSON()).toMatchSnapshot(
      "6. should render an article summary component with headline and blank content"
    );
  });

  it("should render an article summary component with empty content at the end trimmed", () => {
    const testInstance = TestRenderer.create(
      <ArticleSummary
        {...emptyParagraphFixture({
          byline,
          headline,
          label,
          paragraph1,
          paragraph2
        })}
      />
    );

    expect(testInstance.toJSON()).toMatchSnapshot(
      "7. should render an article summary component with empty content at the end trimmed"
    );
  });

  it("should render an article summary component with no byline", () => {
    const testInstance = TestRenderer.create(
      <ArticleSummary {...noBylineFixture({ headline, paragraph })} />
    );

    expect(testInstance.toJSON()).toMatchSnapshot(
      "8. should render an article summary component with no byline"
    );
  });

  it("should render an article summary component with no label", () => {
    const testInstance = TestRenderer.create(
      <ArticleSummary
        {...noLabelFixture({
          byline,
          headline,
          paragraph
        })}
      />
    );

    expect(testInstance.toJSON()).toMatchSnapshot(
      "9. should render an article summary component with no label"
    );
  });

  it("should render an article summary component with no headline", () => {
    const testInstance = TestRenderer.create(
      <ArticleSummary {...noHeadline({ label, paragraph })} />
    );

    expect(testInstance.toJSON()).toMatchSnapshot(
      "10. should render an article summary component with no headline"
    );
  });

  it("should render an article summary component with no date publication", () => {
    const testInstance = TestRenderer.create(
      <ArticleSummary
        {...noDatePublication({ byline, headline, label, paragraph })}
      />
    );

    expect(testInstance.toJSON()).toMatchSnapshot(
      "11. should render an article summary component with no date publication"
    );
  });

  it("should render an article summary component with a video label", () => {
    const testInstance = TestRenderer.create(
      <ArticleSummary
        {...videoLabelFixture({ byline, headline, label, paragraph })}
      />
    );

    expect(testInstance.toJSON()).toMatchSnapshot(
      "12. should render an article summary component with a video label"
    );
  });

  it("should handle rendering empty or undefined ast", () => {
    expect(renderAst([])).toEqual([]);
    expect(renderAst()).toEqual([]);
  });
};
