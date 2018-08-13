import React from "react";
import Context, { scales } from "@times-components/context";
import Article from "../src/article";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";

export default renderComponent => [
  {
    name: "scaled medium full article",
    test: () => {
      const output = renderComponent(
        <Context.Provider value={{ theme: { scale: scales.medium } }}>
          <Article
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
            onVideoPress={() => {}}
          />
        </Context.Provider>
      );

      expect(output).toMatchSnapshot();
    }
  }
];
