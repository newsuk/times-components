import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleMainStandard from "@times-components/article-main-standard";
import ArticleMainComment from "@times-components/article-main-comment";
import ArticleMagazineStandard from "@times-components/article-magazine-standard";
import ArticleMagazineComment from "@times-components/article-magazine-comment";
import Article from "../src/article";

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

describe("Article", () => {
  it("renders with ArticleMainStandard as the default template if article is null", () => {
    const testRenderer = TestRenderer.create(
      <Article {...requiredProps} article={null} />
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMainStandard)).toBeTruthy();
  });

  it("renders with ArticleMainStandard as the default template if no template is provided", () => {
    const testRenderer = TestRenderer.create(
      <Article article={{}} {...requiredProps} />
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMainStandard)).toBeTruthy();
  });

  it("renders with ArticleMainStandard if the correct template is chosen", () => {
    const testRenderer = TestRenderer.create(
      <Article article={{ template: "mainstandard" }} {...requiredProps} />
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMainStandard)).toBeTruthy();
  });

  it("renders with ArticleMainComment if the correct template is chosen", () => {
    const testRenderer = TestRenderer.create(
      <Article article={{ template: "maincomment" }} {...requiredProps} />
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMainComment)).toBeTruthy();
  });

  it("renders with ArticleMagazineStandard if the correct template is chosen", () => {
    const testRenderer = TestRenderer.create(
      <Article article={{ template: "magazinestandard" }} {...requiredProps} />
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMagazineStandard)).toBeTruthy();
  });

  it("renders with ArticleMagazineComment if the correct template is chosen", () => {
    const testRenderer = TestRenderer.create(
      <Article article={{ template: "magazinecomment" }} {...requiredProps} />
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMagazineComment)).toBeTruthy();
  });
});
