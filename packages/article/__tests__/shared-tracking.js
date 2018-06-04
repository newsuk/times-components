import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import mockDate from "mockdate";
import Article from "../src/article";
import { adConfig } from "./shared";

import fullArticleFixture from "../fixtures/full-article.json";

export default () => {
  beforeEach(() => {
    mockDate.set(1514764800000, 0);
  });

  afterEach(() => {
    mockDate.reset();
  });

  it("should track page view", () => {
    const stream = jest.fn();

    renderer.create(
      <Article
        {...fullArticleFixture.data}
        adConfig={adConfig}
        analyticsStream={stream}
        onAuthorPress={() => {}}
        onLinkPress={() => {}}
        onRelatedArticlePress={() => {}}
        onTopicPress={() => {}}
        onVideoPress={() => {}}
      />
    );
    const call = stream.mock.calls[0][0];

    expect(call).toMatchSnapshot(
      "Send analytics when rendering an Article page"
    );
  });
};
