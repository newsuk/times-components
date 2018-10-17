/* eslint-disable react/no-multi-comp */

import React, { Component } from "react";
import PropTypes from "prop-types";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components/test-utils";
import Context from "@times-components/context";
import { scales } from "@times-components/styleguide";
import Article from "../src/article";
import articleFixture, {
  testFixture,
  videoLeadAsset
} from "../fixtures/full-article";
import { adConfig } from "./ad-mock";
import articleProps from "./shared-article-props";

const findComponents = (testInstance, componentName) =>
  testInstance.root.findAll(node => {
    if (typeof node.type === "string") {
      return node.type.includes(componentName);
    }

    return false;
  });

const emptyArticle = {
  byline: null,
  flags: null,
  hasVideo: null,
  label: null,
  leadAsset: null,
  relatedArticleSlice: null,
  standfirst: null,
  topics: null
};

export const snapshotTests = renderComponent => [
  {
    name: "an error",
    test() {
      const props = {
        error: { message: "An example error." }
      };

      const output = renderComponent(
        <Article
          {...props}
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
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
  },
  {
    name: "a full article with an image as the lead asset",
    test() {
      const article = articleFixture({
        ...testFixture,
        content: [
          {
            attributes: {
              caption: "An image caption",
              credits: "The image credits",
              display: "primary",
              ratio: "1500:1000",
              url: "https://image.io"
            },
            children: [],
            name: "image"
          },
          {
            attributes: {
              href: "https://link.io",
              target: "_blank"
            },
            children: [
              {
                attributes: {
                  value: "Some Link"
                },
                children: [],
                name: "text"
              }
            ],
            name: "link"
          },
          {
            attributes: {},
            children: [
              {
                attributes: {
                  value: "Some content"
                },
                children: [],
                name: "text"
              }
            ],
            name: "paragraph"
          },
          {
            attributes: {
              caption: {
                name: "AName",
                twitter: "@AName"
              },
              content: "A pull quote"
            },
            children: [],
            name: "pullQuote"
          },
          {
            attributes: {
              brightcoveAccountId: "57838016001",
              brightcovePolicyKey: "1.2.3.4",
              brightcoveVideoId: "4084164751001",
              caption: "This is video caption",
              display: "primary",
              paidOnly: "false",
              posterImageId: "0c0309d4-1aeb-11e8-9010-1eef6ba5d3de",
              posterImageUrl: "https://image.io",
              skySports: false
            },
            children: [],
            name: "video"
          }
        ]
      });

      const output = renderComponent(
        <Article
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={article}
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
  },
  {
    name: "an article with a video as the lead asset",
    test() {
      const output = renderComponent(
        <Article
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            ...emptyArticle,
            hasVideo: true,
            leadAsset: videoLeadAsset({
              brightcovePolicyKey: "1.2.3.4"
            })
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
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an article with no lead asset",
    test() {
      const output = renderComponent(
        <Article
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            ...emptyArticle
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
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an article with ads",
    test() {
      const output = renderComponent(
        <Article
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            ...emptyArticle,
            content: [
              {
                attributes: {},
                children: [],
                name: "ad"
              }
            ]
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
      );

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an article loading state",
    test() {
      const testInstance = TestRenderer.create(
        <Article
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture()}
          isLoading
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

      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "an article with updated byline",
    test() {
      class Wrapper extends Component {
        constructor(props) {
          super(props);

          this.state = {
            byline: null
          };
        }

        render() {
          return this.props.children(this.state.byline);
        }
      }

      Wrapper.propTypes = {
        children: PropTypes.func.isRequired
      };

      const output = renderComponent(
        <Wrapper>
          {byline => (
            <Context.Provider
              value={{
                theme: { scale: scales.medium, sectionColour: "#FFFFFF" }
              }}
            >
              <Article
                {...articleProps}
                adConfig={adConfig}
                analyticsStream={() => {}}
                article={articleFixture({
                  ...testFixture,
                  ...emptyArticle,
                  byline
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
          )}
        </Wrapper>
      );

      expect(output).toMatchSnapshot();

      output.getInstance().setState({ byline: testFixture.byline });

      expect(output).toMatchSnapshot();
    }
  }
];

const negativeTests = [
  {
    name: "an article with no flags",
    test() {
      const testInstance = TestRenderer.create(
        <Article
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            flags: null
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
      );

      const flags = findComponents(testInstance, "Flag");

      expect(flags).toEqual([]);
    }
  },
  {
    name: "an article with no byline",
    test() {
      const testInstance = TestRenderer.create(
        <Article
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({ ...testFixture, byline: null })}
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

      const byline = findComponents(testInstance, "ArticleBylineWithLinks");

      expect(byline).toEqual([]);
    }
  },
  {
    name: "an article with no label",
    test() {
      const testInstance = TestRenderer.create(
        <Article
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({ ...testFixture, label: null })}
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

      const label = findComponents(testInstance, "ArticleLabel");

      expect(label).toEqual([]);
    }
  },
  {
    name: "an article with no standfirst",
    test() {
      const testInstance = TestRenderer.create(
        <Article
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            standfirst: null
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
      );

      const textNodes = testInstance.root.findAll(node => {
        if (typeof node.type === "string") {
          return (
            node.type === "Text" &&
            typeof node.props.children === "string" &&
            node.props.children === "Some Standfirst"
          );
        }

        return false;
      });

      expect(textNodes).toEqual([]);
    }
  },
  {
    name: "an article with missing 16:9 lead asset",
    test() {
      const testInstance = TestRenderer.create(
        <Article
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            leadAsset: {
              ...testFixture.leadAsset,
              crop169: null
            }
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
      );

      const {
        crop169,
        crop32
      } = testInstance.root.instance.props.article.leadAsset;
      expect(crop169).toEqual(null);
      expect(crop32).not.toEqual(null);
    }
  }
];

export default (renderComponent, platformTests = []) => {
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

  iterator([
    ...snapshotTests(renderComponent),
    ...platformTests,
    ...negativeTests
  ]);
};

export { adConfig };
