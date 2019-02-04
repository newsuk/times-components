import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
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
import straplineFixture from "../fixtures/strapline";

jest.mock("@times-components/article-byline", () => ({
  __esModule: true,
  ArticleBylineOpinion: "ArticleBylineOpinion",
  default: "ArticleByline"
}));
jest.mock("@times-components/article-flag", () => ({
  ArticleFlags: "ArticleFlags"
}));
jest.mock("@times-components/article-label", () => "ArticleLabel");
jest.mock("@times-components/date-publication", () => "DatePublication");
jest.mock("@times-components/video-label", () => "VideoLabel");

export default () => {
  const byline = "A byline";
  const flags = ["UPDATED"];
  const headline = "Test Headline";
  const label = "Test label";
  const paragraph = "Test paragraph";
  const paragraph1 = "Test paragraph 1.";
  const paragraph2 = "Test paragraph 2";
  const strapline = "Test Strapline";

  const tests = [
    {
      name: "article summary component with a single paragraph",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleSummary
            {...defaultFixture({
              flags,
              headline,
              label,
              paragraph
            })}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "article summary with opinion byline",
      test: () => {
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

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "article summary component with multiple paragraphs",
      test: () => {
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

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "article summary component with content including line breaks",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleSummary
            {...reviewFixture({
              headline,
              label,
              paragraph,
              review1Title: "Review 1",
              review2Title: "Review 2"
            })}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "article summary component containing links",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleSummary
            {...withSummaryLinksFixture({
              headline,
              label
            })}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "article summary component with headline and no content",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleSummary
            {...blankFixture({
              headline,
              label
            })}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "article summary component with empty content at the end trimmed",
      test: () => {
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

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "article summary component with no byline",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleSummary {...noBylineFixture({ headline, paragraph })} />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "article summary component with no label",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleSummary
            {...noLabelFixture({
              byline,
              headline,
              paragraph
            })}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "article summary component with no headline",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleSummary {...noHeadline({ label, paragraph })} />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "article summary component with no date publication",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleSummary
            {...noDatePublication({ byline, headline, label, paragraph })}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "article summary component with a video label",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleSummary
            {...videoLabelFixture({ byline, headline, label, paragraph })}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "article summary component with a strapline",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleSummary
            {...straplineFixture({
              flags,
              headline,
              label,
              paragraph,
              strapline
            })}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "should handle rendering empty or undefined ast",
      test: () => {
        expect(renderAst([])).toEqual([]);
        expect(renderAst()).toEqual([]);
      }
    }
  ];

  iterator(tests);
};
