import React from "react";
import Context from "@times-components/context";
import { scales } from "@times-components/styleguide";
import Article from "../src/article";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";
import articleProps from "./shared-article-props";

export default renderComponent => [
  {
    name: "scaled medium full article",
    test: () => {
      const output = renderComponent(
        <Context.Provider value={{ theme: { scale: scales.medium } }}>
          <Article
            {...articleProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            article={articleFixture({
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
        </Context.Provider>
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "scaled large full article",
    test: () => {
      const output = renderComponent(
        <Context.Provider value={{ theme: { scale: scales.large } }}>
          <Article
            {...articleProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            article={articleFixture({
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
        </Context.Provider>
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "scaled xlarge full article",
    test: () => {
      const output = renderComponent(
        <Context.Provider value={{ theme: { scale: scales.xlarge } }}>
          <Article
            {...articleProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            article={articleFixture({
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
        </Context.Provider>
      );

      expect(output).toMatchSnapshot();
    }
  }
];
