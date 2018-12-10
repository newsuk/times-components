/* eslint-disable react/no-multi-comp */
import React from "react";
import { iterator, makeArticleUrl } from "@times-components/test-utils";
import Context from "@times-components/context";
import { scales } from "@times-components/styleguide";
import ArticleSkeleton from "../src/article-skeleton";
import contentWithNestedFirstParagraph from "../fixtures/bold-article-content";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";

const renderArticle = (data, header = null) => (
  <Context.Provider
    value={{
      makeArticleUrl,
      theme: { scale: scales.medium, sectionColour: "#FF0000" }
    }}
  >
    <ArticleSkeleton
      adConfig={adConfig}
      analyticsStream={() => {}}
      data={data}
      header={header}
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

const fixtureArgs = {
  ...testFixture,
  content: [
    {
      children: [
        {
          attributes: {
            value: "This being Black History Month, last week"
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
        url: "https://interactive.io"
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
      attributes: {},
      children: [],
      name: "ad"
    },
    {
      attributes: {
        caption: {
          name: "AName",
          text: "a text",
          twitter: "@AName"
        }
      },
      children: [
        {
          attributes: {
            value: "The pull quote content"
          },
          children: [],
          name: "text"
        }
      ],
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
};

export const snapshotTests = renderComponent => [
  {
    name: "a full article with all content items with dropcap template",
    test() {
      const template = "maincomment";
      const article = articleFixture({ ...fixtureArgs, template });
      const output = renderComponent(renderArticle(article));

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "a full article with all content items with not a dropcap template",
    test() {
      const template = "mainstandard";
      const article = articleFixture({ ...fixtureArgs, template });
      const output = renderComponent(renderArticle(article));

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an article with no content",
    test() {
      const article = articleFixture({ ...fixtureArgs, content: [] });
      const output = renderComponent(renderArticle(article));

      expect(output).toMatchSnapshot();
    }
  },
  {
    name:
      "an article with a nested markup in first paragraph displays no drop cap",
    test() {
      const template = "maincomment";
      const article = articleFixture({
        ...fixtureArgs,
        content: contentWithNestedFirstParagraph,
        relatedArticleSlice: null,
        template,
        topics: []
      });
      const output = renderComponent(renderArticle(article));

      expect(output).toMatchSnapshot();
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

  iterator([...snapshotTests(renderComponent), ...platformTests]);
};

export { adConfig };
