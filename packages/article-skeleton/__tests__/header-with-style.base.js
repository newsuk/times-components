/* eslint-disable react/no-multi-comp */
import React from "react";
import { Text, View } from "react-native";
import { iterator } from "@times-components/test-utils";
import { ContextProviderWithDefaults } from "@times-components/context";
import { scales } from "@times-components/styleguide";
import ArticleSkeleton from "../src/article-skeleton";
import articleFixture from "../fixtures/full-article";
import { adConfig } from "./ad-mock";

const emptyArticle = {
  bylines: null,
  flags: null,
  hasVideo: null,
  label: null,
  leadAsset: null,
  relatedArticleSlice: null,
  standfirst: null,
  topics: null
};

const renderArticle = (data, header) => (
  <ContextProviderWithDefaults
    value={{
      theme: { scale: scales.medium, sectionColour: "#FF0000" }
    }}
  >
    <ArticleSkeleton
      adConfig={adConfig}
      analyticsStream={() => {}}
      data={data}
      header={header}
      onAuthorPress={() => {}}
      onCommentGuidelinesPress={() => {}}
      onCommentsPress={() => {}}
      onLinkPress={() => {}}
      onRelatedArticlePress={() => {}}
      onTopicPress={() => {}}
      onTwitterLinkPress={() => {}}
      onVideoPress={() => {}}
    />
  </ContextProviderWithDefaults>
);

export const snapshotTests = renderComponent => [
  {
    name: "article with header",
    test() {
      const header = () => (
        <View>
          <Text>Example Header</Text>
        </View>
      );
      const article = articleFixture(emptyArticle);
      const output = renderComponent(renderArticle(article), header);
      expect(output).toMatchSnapshot();
    }
  }
];

export default renderComponent => {
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

  iterator([...snapshotTests(renderComponent)]);
};
