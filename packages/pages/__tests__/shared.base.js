import React from "react";
import { Article } from "../src/pages";
import getAdTargetingConfig from "../src/client/ad-targeting-config";

export default makeTest => {
  it("renders correctly", () => {
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
          onLinkPress={() => {}}
          onTopicPress={() => {}}
          onVideoPress={() => {}}
          platformAdConfig={{}}
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
      headline: ""
    };

    const adTargetingConfig = getAdTargetingConfig(
      platformAdConfig,
      articleAdConfig
    );
    expect(adTargetingConfig.adUnit).toBe("1234");
    expect(adTargetingConfig.networkId).toBe("5678");
  });
};
