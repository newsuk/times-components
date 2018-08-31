import React from "react";
import fixture from "@times-components/provider-test-tools/fixtures/article";
import { scales } from "@times-components/styleguide";
import "./mocks";
import { Article } from "../src/pages";
import SimpleArticle from "../src/simple-article";
import getAdTargetingConfig from "../src/client/ad-targeting-config";

export default makeTest => {
  it("article page", () => {
    const config = {};
    const fetch = () => {};
    const ArticlePageView = Article(config)(fetch);

    expect(
      makeTest(
        <ArticlePageView
          analyticsStream={() => {}}
          articleId="test-article-id"
          onArticlePress={() => {}}
          onAuthorPress={() => {}}
          onCommentGuidelinesPress={() => {}}
          onCommentsPress={() => {}}
          onLinkPress={() => {}}
          onTopicPress={() => {}}
          onVideoPress={() => {}}
          platformAdConfig={{}}
          scale={scales.large}
          sectionName="News"
        />
      )
    ).toMatchSnapshot();
  });

  it("simple article page", () => {
    const { data: { article } } = fixture({
      byline: null,
      flags: null,
      content: null,
      label: null,
      leadAsset: null,
      relatedArticleSlice: null,
      standfirst: null,
      topics: null
    });

    const platformAdConfig = {
      adUnit: "1234",
      networkId: "5678",
      sectionName: "News"
    };

    expect(
      makeTest(
        <SimpleArticle
          analyticsStream={() => {}}
          article={article}
          error={null}
          isLoading={false}
          onArticlePress={() => {}}
          onAuthorPress={() => {}}
          onCommentGuidelinesPress={() => {}}
          onCommentsPress={() => {}}
          onLinkPress={() => {}}
          onTopicPress={() => {}}
          onVideoPress={() => {}}
          platformAdConfig={platformAdConfig}
          refetch={() => {}}
          scale={scales.large}
          sectionName="News"
        />
      )
    ).toMatchSnapshot();
  });

  it("adUnit and networkId are set correctly", () => {
    const platformAdConfig = {
      adUnit: "1234",
      networkId: "5678",
      sectionName: ""
    };

    const articleAdConfig = {
      headline: "This is a headline",
      keywords: ["this", "is", "a", "headline"]
    };

    const adTargetingConfig = getAdTargetingConfig(
      platformAdConfig,
      articleAdConfig
    );
    expect(adTargetingConfig.adUnit).toBe("1234");
    expect(adTargetingConfig.networkId).toBe("5678");
  });
};
