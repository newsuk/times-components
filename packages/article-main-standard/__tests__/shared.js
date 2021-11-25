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
import { UserState } from "./mocks";
import shared from "./shared.base";
import ArticleMainStandard from "../src/article-main-standard";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";
import articleProps from "./shared-article-props";

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
        UserState.mockStates = [UserState.loggedInOrShared];

        const output = TestRenderer.create(
          <ArticleMainStandard
            {...articleProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            article={articleFixture(testFixture)}
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
