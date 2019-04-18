import React from "react";
import { ContextProviderWithDefaults } from "@times-components/context";
import { scales } from "@times-components/styleguide";
import ArticleSkeleton from "../src/article-skeleton";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";
import articleSkeletonProps from "./shared-article-skeleton-props";

export default renderComponent => [
  {
    name: "scaled medium full article",
    test: () => {
      const output = renderComponent(
        <ContextProviderWithDefaults
          value={{ theme: { scale: scales.medium } }}
        >
          <ArticleSkeleton
            {...articleSkeletonProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            data={articleFixture({
              ...testFixture
            })}
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

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "scaled large full article",
    test: () => {
      const output = renderComponent(
        <ContextProviderWithDefaults value={{ theme: { scale: scales.large } }}>
          <ArticleSkeleton
            {...articleSkeletonProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            data={articleFixture({
              ...testFixture
            })}
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

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "scaled xlarge full article",
    test: () => {
      const output = renderComponent(
        <ContextProviderWithDefaults
          value={{ theme: { scale: scales.xlarge } }}
        >
          <ArticleSkeleton
            {...articleSkeletonProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            data={articleFixture({
              ...testFixture
            })}
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

      expect(output).toMatchSnapshot();
    }
  }
];
