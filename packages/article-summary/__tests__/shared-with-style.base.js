import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleSummary, { ArticleSummaryContent } from "../src/article-summary";
import defaultFixture from "../fixtures/default";

jest.mock("@times-components/article-byline", () => "ArticleByline");
jest.mock("@times-components/article-label", () => "ArticleLabel");
jest.mock("@times-components/date-publication", () => "DatePublication");
jest.mock("@times-components/video-label", () => "VideoLabel");

export default () => {
  const headline = "Test Headline";
  const label = "Test label";
  const paragraph = "Test paragraph";

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

  it("should render an article summary content component with the given style", () => {
    const ast = [
      {
        name: "paragraph",
        attributes: {},
        children: [
          {
            name: "text",
            attributes: {
              value: "Test"
            },
            children: []
          }
        ]
      }
    ];

    const testInstance = TestRenderer.create(
      <ArticleSummaryContent ast={ast} />
    );

    expect(testInstance.toJSON()).toMatchSnapshot(
      "2. should render an article summary content component with the given style"
    );
  });
};
