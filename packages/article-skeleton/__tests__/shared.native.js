import React from "react";
import TestRenderer from "react-test-renderer";
import mockDate from "mockdate";
import {
  addSerializers,
  compose,
  print,
  minimaliseTransform,
  minimalNativeTransform
} from "@times-components/jest-serializer";
import { TextLink } from "@times-components/link";
import "./mocks.native";
import { Text } from "@times-components/text-flow";
import { Roboto } from "@times-components/test-utils";
import shared from "./shared.base";
import ArticleSkeleton from "../src/article-skeleton";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";
import articleSkeletonProps from "./shared-article-skeleton-props";

Text.FontLoader.loadFont("TimesDigitalW04", Roboto);
Text.FontLoader.loadFont("TimesModern-Regular", Roboto);
Text.FontLoader.loadFont("TimesDigitalW04-Bold", Roboto);
Text.FontLoader.loadFont("TimesDigitalW04-Italic", Roboto);

const omitKeys = new Set([
  "data",
  "disableVirtualization",
  "horizontal",
  "onViewableItemsChanged",
  "style",
  "testID",
  "viewabilityConfig",
  "viewabilityConfigCallbackPairs"
]);

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => omitKeys.has(key))
    )
  );

  beforeEach(() => {
    mockDate.set(1514764800000, 0);
  });

  afterEach(() => {
    mockDate.reset();
  });

  const renderArticle = ({ onLinkPress, stream }) => (
    <ArticleSkeleton
      {...articleSkeletonProps}
      adConfig={adConfig}
      analyticsStream={stream || (() => {})}
      data={articleFixture({
        ...testFixture,
        content: [
          {
            children: [
              {
                attributes: {
                  href: "https://link.io",
                  target: "_blank"
                },
                children: [
                  {
                    attributes: {
                      value: "Press Me"
                    },
                    children: [],
                    name: "text"
                  }
                ],
                name: "link"
              }
            ],
            name: "paragraph"
          }
        ]
      })}
      onAuthorPress={() => {}}
      onCommentGuidelinesPress={() => {}}
      onCommentsPress={() => {}}
      onLinkPress={onLinkPress || (() => {})}
      onRelatedArticlePress={() => {}}
      onTopicPress={() => {}}
      onTwitterLinkPress={() => {}}
      onVideoPress={() => {}}
    />
  );

  const tests = [
    {
      name: "an inline link uses the given onPress",
      test() {
        const onLinkPress = jest.fn();

        const testInstance = TestRenderer.create(
          renderArticle({ onLinkPress })
        );

        const [link] = testInstance.root.findAllByType(TextLink);

        link.props.onPress();

        expect(onLinkPress).toHaveBeenCalled();
      }
    },
    {
      name: "an inline link reports analytics event on press",
      test() {
        const stream = jest.fn();

        const testInstance = TestRenderer.create(renderArticle({ stream }));

        const [link] = testInstance.root.findAllByType(TextLink);

        link.props.onPress();

        const [, [call]] = stream.mock.calls;

        expect(call).toMatchSnapshot();
      }
    }
  ];

  shared(TestRenderer.create, tests);
};
