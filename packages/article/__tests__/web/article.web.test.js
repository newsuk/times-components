import "jest-styled-components";
import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import ArticleRow from "../../src/article-body/article-body-row";
import ArticleLink from "../../src/article-body/article-link";
import Article from "../../src/article";
import shared, { adConfig } from "../shared";
import sharedTracking from "../shared-tracking";

import articleFixtureNoLeadAsset from "../../fixtures/no-lead-asset.json";

jest.mock("@times-components/article-byline", () => "ArticleByline");
jest.mock("@times-components/article-flag", () => ({
  ExclusiveArticleFlag: "ExclusiveArticleFlag",
  NewArticleFlag: "NewArticleFlag",
  UpdatedArticleFlag: "UpdatedArticleFlag",
  SponsoredArticleFlag: "SponsoredArticleFlag"
}));
jest.mock("@times-components/article-image", () => "ArticleImage");
jest.mock("@times-components/article-label", () => "ArticleLabel");
jest.mock("@times-components/article-topics", () => "ArticleTopics");
jest.mock("@times-components/video-label", () => "VideoLabel");
jest.mock("@times-components/brightcove-video", () => "BrightcoveVideo");
jest.mock("@times-components/pull-quote", () => "PullQuote");
jest.mock("@times-components/related-articles", () => "RelatedArticles");
jest.mock("@times-components/watermark", () => "Watermark");
jest.mock("@times-components/tracking", () => {
  const mockTracking = component => component;
  return {
    withTrackingContext: mockTracking
  };
});

describe("Article tests on web", () => {
  shared();

  it("renders article with no lead asset", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoLeadAsset.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onLinkPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("ArticleRow should handle a link onPress", () => {
    const testUrl = "http://www.test.com";
    const props = {
      content: {
        data: {
          attributes: {
            href: testUrl
          },
          children: [
            {
              name: "text",
              attributes: {
                value: "police disclosure of evidence"
              },
              children: []
            }
          ],
          name: "link"
        },
        index: 1
      }
    };
    const onPressMock = jest.fn();
    const component = mount(
      <ArticleRow {...props} onLinkPress={onPressMock} />
    );
    const eventObject = { event: true };
    component
      .find(ArticleLink)
      .props()
      .onPress(eventObject);
    expect(onPressMock).toHaveBeenCalledWith(eventObject, { href: testUrl });
  });
});

jest.unmock("@times-components/tracking");

describe("Article Tracking tests on web", () => {
  sharedTracking();
});
