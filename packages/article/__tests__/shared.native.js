import React, { Component } from "react";
import TestRenderer from "react-test-renderer";
import PropTypes from "prop-types";
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

jest.mock("../src/article-comments/article-comments", () => "ArticleComments");

const omitKeys = new Set([
  "data",
  "disableVirtualization",
  "horizontal",
  "style",
  "testID"
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
      name: "an article that moves to a loading state",
      test() {
        class Wrapper extends Component {
          constructor(props) {
            super(props);

            this.state = {
              byline: null,
              isLoading: false
            };
          }

          render() {
            return this.props.children(this.state.byline, this.state.isLoading);
          }
        }

        Wrapper.propTypes = {
          children: PropTypes.func.isRequired
        };

        const testInstance = TestRenderer.create(
          <Wrapper>
            {(byline, isLoading) => (
              <Article
                adConfig={adConfig}
                analyticsStream={() => {}}
                article={articleFixture({
                  ...testFixture,
                  byline,
                  flags: null,
                  label: null,
                  leadAsset: null,
                  relatedArticleSlice: null,
                  standfirst: null,
                  topics: null
                })}
                isLoading={isLoading}
                onAuthorPress={() => {}}
                onCommentGuidelinesPress={() => {}}
                onCommentsPress={() => {}}
                onLinkPress={() => {}}
                onRelatedArticlePress={() => {}}
                onTopicPress={() => {}}
                onTwitterLinkPress={() => {}}
                onVideoPress={() => {}}
              />
            )}
          </Wrapper>
        );

        expect(testInstance).toMatchSnapshot();

        testInstance
          .getInstance()
          .setState({ byline: testFixture.byline, isLoading: true });

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "an inline link uses the given onPress",
      test() {
        const onLinkPress = jest.fn();

        const testInstance = TestRenderer.create(
          <Article
            adConfig={adConfig}
            analyticsStream={() => {}}
            article={articleFixture({
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
