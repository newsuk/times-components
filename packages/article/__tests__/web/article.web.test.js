import "jest-styled-components";
import React from "react";
import TestRenderer from "react-test-renderer";
import { mount } from "enzyme";
import ArticleRow from "../../src/article-body/article-body-row";
import ArticleLink from "../../src/article-body/article-link";
import Article from "../../src/article";
import shared, { adConfig } from "../shared";
import sharedTracking from "../shared-tracking";

import articleFixtureNoLeadAsset from "../../fixtures/no-lead-asset.json";

jest.mock("@times-components/article-byline", () =>
  // eslint-disable-next-line global-require
  require("../article-byline-mock")
);
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

shared();

it("renders article with no lead asset", () => {
  const testInstance = TestRenderer.create(
    <Article
      {...articleFixtureNoLeadAsset.data}
      adConfig={adConfig}
      analyticsStream={() => {}}
      onAuthorPress={() => {}}
      onLinkPress={() => {}}
      onRelatedArticlePress={() => {}}
      onTopicPress={() => {}}
    />
  ).toJSON();
  expect(testInstance).toMatchSnapshot();
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
  const wrapper = mount(<ArticleRow {...props} onLinkPress={onPressMock} />);
  const eventObject = { event: true };
  wrapper
    .find(ArticleLink)
    .props()
    .onPress(eventObject);
  expect(onPressMock).toHaveBeenCalledWith(eventObject, { href: testUrl });
});

jest.unmock("@times-components/tracking");

sharedTracking();
