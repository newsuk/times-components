import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import { fixtures } from "@times-components/provider-test-tools";
import { UserState } from "./mocks";
import shared from "./shared.base";
import ArticleMainVideo from "../src/article-main-video";
import { adConfig } from "./ad-mock";

const omitProps = new Set([
  "className",
  "data-testid",
  "responsiveLinkStyles",
  "style"
]);

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform((value, key) => omitProps.has(key))
    )
  );

  beforeEach(() => {
    UserState.mockStates = [];
  });

  shared(TestRenderer.create, [
    {
      name: "should show topics when logged in or shared",
      test() {
        UserState.mockStates = [
          UserState.showSaveAndShareBar,
          UserState.showArticleExtras,
          UserState.showTopicTags
        ];

        const output = TestRenderer.create(
          <ArticleMainVideo
            adConfig={adConfig}
            analyticsStream={() => {}}
            article={fixtures.articleVideoData}
            onAuthorPress={() => {}}
            onCommentGuidelinesPress={() => {}}
            onCommentsPress={() => {}}
            onLinkPress={() => {}}
            onRelatedArticlePress={() => {}}
            onTopicPress={() => {}}
            onTwitterLinkPress={() => {}}
            onVideoPress={() => {}}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ]);
};
