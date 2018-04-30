import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Article from "../src/article";
import { adConfig } from "./shared";

import fullArticleFixture from "../fixtures/full-article.json";

export default () => {
  it("should track page view", () => {
    const stream = jest.fn();

    const { topics } = fullArticleFixture.data.article;
    renderer.create(
      <Article
        {...fullArticleFixture.data}
        analyticsStream={stream}
        adConfig={adConfig}
        onRelatedArticlePress={() => {}}
        onAuthorPress={() => {}}
        onVideoPress={() => {}}
        onLinkPress={() => {}}
      />
    );
    expect(stream).toHaveBeenCalledWith({
      object: "Article",
      component: "Page",
      action: "Viewed",
      attrs: expect.objectContaining({
        headline:
          "Caribbean islands devastated by Hurricane Irma, the worst Atlantic storm on record",
        byline:
          "Rosemary Bennett, Education Editor | Nicola Woolcock, Education Correspondent",
        publishedTime: "2015-03-13T18:54:58.000Z",
        topics
      })
    });
  });
};
