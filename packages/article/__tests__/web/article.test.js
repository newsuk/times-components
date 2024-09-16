import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleMainStandard from "@times-components/article-main-standard";
import ArticleMainComment from "@times-components/article-main-comment";
import ArticleMagazineStandard from "@times-components/article-magazine-standard";
import ArticleMagazineComment from "@times-components/article-magazine-comment";
import Article from "../../src/article";
import { testFixture } from "../../fixtures/full-article";

jest.mock("@times-components/image", () => "TimesImage");
jest.mock("react-helmet-async", () => ({ Helmet: "Helmet" }));

const requiredProps = {
  adConfig: {},
  analyticsStream: () => {},
  error: null,
  isLoading: false,
  onAuthorPress: () => {},
  onCommentGuidelinesPress: () => {},
  onCommentsPress: () => {},
  onLinkPress: () => {},
  onRelatedArticlePress: () => {},
  onTopicPress: () => {},
  onTwitterLinkPress: () => {},
  onVideoPress: () => {},
  onViewed: () => {},
  receiveChildList: () => {},
  refetch: () => {}
};

const articleContentData = {
  content: testFixture.content,
  section: testFixture.section,
  tiles: []
};

describe("Article", () => {
  it("renders with ArticleMainStandard as the default template if article is null", () => {
    const testRenderer = TestRenderer.create(
      <Article {...requiredProps} article={null} />
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMainStandard)).toBeTruthy();
  });

  it("throws `ENOCONTENT` error if article content is null", () => {
    const emptyArticleContentData = {
      content: [],
      tiles: []
    };

    const testRenderer = () =>
      TestRenderer.create(
        <Article {...requiredProps} article={emptyArticleContentData} />
      )
        .then(res => res.root)
        .catch(() => {});

    expect(() => testRenderer()).toThrow("ENOCONTENT");
  });

  it("renders with ArticleMainStandard as the default template if no template is provided", () => {
    const testRenderer = TestRenderer.create(
      <Article article={{ ...articleContentData }} {...requiredProps} />
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMainStandard)).toBeTruthy();
  });

  it("renders with ArticleMainStandard if an unknown template is chosen", () => {
    const testRenderer = TestRenderer.create(
      <Article
        article={{
          publishedTime: "2015-03-23T19:39:39.000Z",
          template: "undefined",
          ...articleContentData
        }}
        {...requiredProps}
      />
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMainStandard)).toBeTruthy();
  });

  it("renders with ArticleMainStandard as the default template if null is set for template", () => {
    const testRenderer = TestRenderer.create(
      <Article
        article={{ template: null, ...articleContentData }}
        {...requiredProps}
      />
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMainStandard)).toBeTruthy();
  });

  it("renders with ArticleMainStandard if the correct template is chosen", () => {
    const testRenderer = TestRenderer.create(
      <Article
        article={{ template: "mainstandard", ...articleContentData }}
        {...requiredProps}
      />
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMainStandard)).toBeTruthy();
  });

  it("renders with ArticleMainComment if the correct template is chosen", () => {
    const testRenderer = TestRenderer.create(
      <Article
        article={{ template: "maincomment", ...articleContentData }}
        {...requiredProps}
      />
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMainComment)).toBeTruthy();
  });

  it("renders with ArticleMagazineStandard if the correct template is chosen", () => {
    const testRenderer = TestRenderer.create(
      <Article
        article={{ template: "magazinestandard", ...articleContentData }}
        {...requiredProps}
      />
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMagazineStandard)).toBeTruthy();
  });

  it("renders with ArticleMagazineComment if the correct template is chosen", () => {
    const testRenderer = TestRenderer.create(
      <Article
        article={{ template: "magazinecomment", ...articleContentData }}
        {...requiredProps}
      />
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMagazineComment)).toBeTruthy();
  });
});
