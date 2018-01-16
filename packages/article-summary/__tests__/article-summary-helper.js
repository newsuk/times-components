import React from "react";
import renderer from "react-test-renderer";
import articleMultiFixture from "../fixtures/article-multi.json";
import articleSingleFixture from "../fixtures/article-single.json";
import emptyParagraphFixture from "../fixtures/article-empty-paragraph.json";
import reviewFixture from "../fixtures/review.json";
import blankFixture from "../fixtures/blank.json";

export default ArticleSummary => {
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

  it("renders an article-summary component with multiple paragraphs", () => {
    const tree = renderer
      .create(<ArticleSummary {...articleMultiFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with a single paragraph", () => {
    const tree = renderer
      .create(<ArticleSummary {...articleSingleFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with content including line breaks", () => {
    const tree = renderer
      .create(<ArticleSummary {...reviewFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with headline and no content", () => {
    const tree = renderer.create(<ArticleSummary {...blankFixture} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders an article-summary component with empty content at the end trimmed", () => {
    const tree = renderer
      .create(<ArticleSummary {...emptyParagraphFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
