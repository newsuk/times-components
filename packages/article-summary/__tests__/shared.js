import React from "react";
import renderer from "react-test-renderer";
import ArticleSummary, {
  ArticleSummaryContent,
  ArticleSummaryHeadline,
  renderAst
} from "../src/article-summary";
import defaultFixture from "../fixtures/default";
import withSummaryLinksFixture from "../fixtures/with-summary-links";
import opinionBylineFixture from "../fixtures/opinion-byline";
import articleMultiFixture from "../fixtures/article-multi";
import emptyParagraphFixture from "../fixtures/article-empty-paragraph";
import noBylineFixture from "../fixtures/no-byline";
import noLabelFixture from "../fixtures/no-label";
import reviewFixture from "../fixtures/review";
import blankFixture from "../fixtures/blank";
import noContentFixture from "../fixtures/no-content";
import noHeadline from "../fixtures/no-headline";
import noDatePublication from "../fixtures/no-datepublication";
import videoLabelFixture from "../fixtures/video-label";

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

  it("should render an article-summary component with a single paragraph", () => {
    const tree = renderer
      .create(<ArticleSummary {...defaultFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot(
      "1. should render an article-summary component with a single paragraph"
    );
  });

  it("should render an article-summary with opinion byline", () => {
    const tree = renderer
      .create(<ArticleSummary {...opinionBylineFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot(
      "2. should render an article-summary with opinion byline"
    );
  });

  it("should render an article-summary component with multiple paragraphs", () => {
    const tree = renderer
      .create(<ArticleSummary {...articleMultiFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot(
      "3. should render an article-summary component with multiple paragraphs"
    );
  });

  it("should render an article-summary component with content including line breaks", () => {
    const tree = renderer
      .create(<ArticleSummary {...reviewFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot(
      "4. should render an article-summary component with content including line breaks"
    );
  });

  it("should render an article-summary component containing links", () => {
    const tree = renderer
      .create(<ArticleSummary {...withSummaryLinksFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot(
      "5. should render an article-summary component containing links"
    );
  });

  it("should render an article-summary component with headline and blank content", () => {
    const tree = renderer.create(<ArticleSummary {...blankFixture} />).toJSON();

    expect(tree).toMatchSnapshot(
      "6. should render an article-summary component with headline and blank content"
    );
  });

  it("should render an article-summary component with headline and no content", () => {
    const tree = renderer
      .create(<ArticleSummary {...noContentFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot(
      "7. should render an article-summary component with headline and no content"
    );
  });

  it("should render an article-summary component with empty content at the end trimmed", () => {
    const tree = renderer
      .create(<ArticleSummary {...emptyParagraphFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot(
      "8. should render an article-summary component with empty content at the end trimmed"
    );
  });

  it("should render an article-summary component with no byline", () => {
    const tree = renderer
      .create(<ArticleSummary {...noBylineFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot(
      "9. should render an article-summary component with no byline"
    );
  });

  it("should render an article-summary component with no label", () => {
    const tree = renderer
      .create(<ArticleSummary {...noLabelFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot(
      "10. should render an article-summary component with no label"
    );
  });

  it("should render an article-summary component with no headline", () => {
    const tree = renderer.create(<ArticleSummary {...noHeadline} />).toJSON();

    expect(tree).toMatchSnapshot(
      "11. should render an article-summary component with no headline"
    );
  });

  it("should render an article-summary component with no date publication", () => {
    const tree = renderer
      .create(<ArticleSummary {...noDatePublication} />)
      .toJSON();

    expect(tree).toMatchSnapshot(
      "12. should render an article-summary component with no date publication"
    );
  });

  it("should render an ArticleSummaryContent component with a blank AST", () => {
    const tree = renderer.create(<ArticleSummaryContent ast={[]} />).toJSON();

    expect(tree).toMatchSnapshot(
      "13. should render an ArticleSummaryContent component with a blank AST"
    );
  });

  it("should render an ArticleSummaryContent component with a AST", () => {
    const ast = [
      {
        name: "paragraph",
        attributes: {},
        children: [
          {
            name: "text",
            attributes: {
              value: "Victoria"
            },
            children: []
          }
        ]
      }
    ];
    const tree = renderer.create(<ArticleSummaryContent ast={ast} />).toJSON();

    expect(tree).toMatchSnapshot(
      "14. should render an ArticleSummaryContent component with a AST"
    );
  });

  it("should render an ArticleSummaryContent component with two paragraphs", () => {
    const ast = [
      {
        name: "paragraph",
        attributes: {},
        children: [
          {
            name: "text",
            attributes: {
              value:
                "The special forces dog fought on under fire, even after shrapnel from Taliban grenades tore into his belly and legs, blew out a front tooth and damaged his right ear."
            },
            children: []
          }
        ]
      },
      {
        name: "paragraph",
        attributes: {},
        children: [
          {
            name: "text",
            attributes: {
              value:
                "Mali sniffed out explosives and insurgents during a gunfight that lasted seven and a half hours to help a team of Special Boat Service (SBS) operators hunt down and kill more than a dozen."
            },
            children: []
          }
        ]
      }
    ];
    const tree = renderer.create(<ArticleSummaryContent ast={ast} />).toJSON();

    expect(tree).toMatchSnapshot(
      "15. should render an ArticleSummaryContent component with two paragraphs"
    );
  });

  it("should render an article-summary component with a video label", () => {
    const tree = renderer
      .create(<ArticleSummary {...videoLabelFixture} />)
      .toJSON();

    expect(tree).toMatchSnapshot(
      "16. should render an article-summary component with a video label"
    );
  });

  it("should render an ArticleSummaryHeadline component with a blank AST", () => {
    const tree = renderer
      .create(<ArticleSummaryHeadline headline="Example headline" />)
      .toJSON();

    expect(tree).toMatchSnapshot(
      "17. should render an ArticleSummaryHeadline component with a blank AST"
    );
  });

  it("should handle rendering empty or undefined ast", () => {
    expect(renderAst([])).toEqual([]);
    expect(renderAst()).toEqual([]);
  });
};
