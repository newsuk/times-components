/* eslint-disable react/no-multi-comp */

import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator, makeArticleUrl } from "@times-components/test-utils";
import Context from "@times-components/context";
import { scales } from "@times-components/styleguide";
import Article from "../src/article";
import articleFixture, { testFixture } from "../fixtures/full-article";
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

const renderArticle = data => (
  // <AdComposer adConfig={articleAdConfig}>
  <Context.Provider
    value={{
      makeArticleUrl,
      theme: { scale: scales.medium, sectionColour: "#FF0000" }
    }}
  >
    <Article
      analyticsStream={() => {}}
      data={data}
      onAuthorPress={() => {}}
      onCommentGuidelinesPress={() => {}}
      onCommentsPress={() => {}}
      onLinkPress={() => {}}
      onRelatedArticlePress={() => {}}
      onTopicPress={() => {}}
      onTwitterLinkPress={() => {}}
    />
  </Context.Provider>
  // </AdComposer>
);

export const snapshotTests = renderComponent => [
  {
    name: "a full article with all content items",
    test() {
      const article = articleFixture({
        ...testFixture,
        content: [
          {
            children: [
              {
                attributes: {
                  value: "T"
                },
                children: [],
                name: "dropCap"
              },
              {
                attributes: {
                  value: "his being Black History Month, last week"
                },
                children: [],
                name: "text"
              }
            ],
            name: "paragraph"
          },
          {
            attributes: {
              display: "secondary",
              element: {
                attributes: {
                  "chart-id": "csmgb"
                },
                value: "times-datawrapper"
              },
              id: "d2f83305-d558-4f78-f582-32115c659355",
              url:
                "//components.timesdev.tools/lib2/times-datawrapper-1.1.0/times-datawrapper.html"
            },
            children: [],
            name: "interactive"
          },
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
              caption: "A secondary image caption",
              credits: "The secondary image credits",
              display: "secondary",
              ratio: "1500:1000",
              url: "https://image.io/secondary"
            },
            children: [],
            name: "image"
          },
          {
            attributes: {
              caption: "An inline image caption",
              credits: "The inline image credits",
              display: "inline",
              ratio: "1500:1000",
              url: "https://image.io/inline"
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
          },
          {
            attributes: {
              title: "Example title"
            },
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        attributes: {
                          value: "Example bullet text"
                        },
                        children: [],
                        name: "text"
                      }
                    ],
                    name: "listElement"
                  },
                  {
                    children: [
                      {
                        attributes: {
                          value: "An example "
                        },
                        children: [],
                        name: "text"
                      },
                      {
                        attributes: {
                          href: "https://example.io",
                          target: "_blank",
                          type: "topic"
                        },
                        children: [
                          {
                            attributes: {
                              value: "link"
                            },
                            children: [],
                            name: "text"
                          }
                        ],
                        name: "link"
                      }
                    ],
                    name: "listElement"
                  },
                  {
                    children: [
                      {
                        attributes: {
                          value: "More example text."
                        },
                        children: [],
                        name: "text"
                      }
                    ],
                    name: "listElement"
                  },
                  {
                    children: [
                      {
                        attributes: {
                          value: "Example text "
                        },
                        children: [],
                        name: "text"
                      },
                      {
                        attributes: {},
                        children: [
                          {
                            attributes: {
                              value: "this is bold "
                            },
                            children: [],
                            name: "text"
                          }
                        ],
                        name: "bold"
                      },
                      {
                        attributes: {},
                        children: [
                          {
                            attributes: {
                              value: "this is in italics."
                            },
                            children: [],
                            name: "text"
                          }
                        ],
                        name: "italic"
                      }
                    ],
                    name: "listElement"
                  }
                ],
                name: "unorderedList"
              }
            ],
            name: "keyFacts"
          }
        ]
      });

      const output = renderComponent(renderArticle(article));

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an empty article",
    test() {
      const article = articleFixture(emptyArticle);
      const output = renderComponent(renderArticle(article));
      expect(output).toMatchSnapshot();
    }
<<<<<<< HEAD
  },
  {
    name: "an article with no headline falls back to use shortHeadline",
    test() {
      const output = renderComponent(
        <Article
          {...articleProps}
          adConfig={adConfig}
          analyticsStream={() => {}}
          article={articleFixture({
            ...testFixture,
            ...emptyArticle,
            headline: ""
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
=======
>>>>>>> chore: Some web test scrubbing
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
    ...platformTests
  ]);
};

export { adConfig };
