import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import ArticleSummary, { ArticleSummaryContent } from "../src/article-summary";
import defaultFixture from "../fixtures/default";

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
  const headline = "Test Headline";
  const label = "Test label";
  const paragraph = "Test paragraph";
  const ast = [
    {
      attributes: {},
      children: [
        {
          attributes: {
            value: "Test"
          },
          children: [],
          name: "text"
        }
      ],
      name: "paragraph"
    }
  ];

  const tests = [
    {
      name: "article summary component with a single paragraph",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleSummary
            {...defaultFixture({
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
      name: "article summary content component with the given style",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleSummaryContent ast={ast} />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name:
        "article summary content component with white space height and lineHeight",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleSummaryContent
            ast={ast}
            style={{ lineHeight: 30 }}
            whiteSpaceHeight={60}
          />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    },
    {
      name: "article summary content component without white space height",
      test: () => {
        const testInstance = TestRenderer.create(
          <ArticleSummaryContent ast={ast} whiteSpaceHeight={0} />
        );

        expect(testInstance.toJSON()).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
