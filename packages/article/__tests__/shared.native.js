import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  print,
  minimaliseTransform,
  minimalNativeTransform
} from "@times-components/jest-serializer";
import "./mocks.native";
import shared from "./shared.base";
import Article from "../src/article";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";
import articleProps from "./shared-article-props";

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

  const tests = [
    {
      name: "an inline link uses the given onPress",
      test() {
        const onLinkPress = jest.fn();

        const testInstance = TestRenderer.create(
          <Article
            {...articleProps}
            adConfig={adConfig}
            analyticsStream={() => {}}
            data={articleFixture({
              ...testFixture,
              content: [
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
              ]
            })}
            onAuthorPress={() => {}}
            onCommentGuidelinesPress={() => {}}
            onCommentsPress={() => {}}
            onLinkPress={onLinkPress}
            onRelatedArticlePress={() => {}}
            onTopicPress={() => {}}
            onTwitterLinkPress={() => {}}
            onVideoPress={() => {}}
          />
        );

        const [link] = testInstance.root.findAll(node => {
          if (typeof node.type === "string") {
            return (
              node.type === "Text" && node.props.accessibilityRole === "link"
            );
          }

          return false;
        });

        link.props.onPress();

        expect(onLinkPress).toHaveBeenCalled();
      }
    }
  ];

  shared(TestRenderer.create, tests);
};
