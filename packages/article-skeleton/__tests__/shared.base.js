/* eslint-disable react/no-multi-comp */
import React from "react";
import { iterator } from "@times-components/test-utils";
import { ContextProviderWithDefaults } from "@times-components/context";
import { scales } from "@times-components/styleguide";
import ArticleSkeleton from "../src/article-skeleton";
import contentWithNestedFirstParagraph from "../fixtures/bold-article-content";
import contentWithHeadingTags from "../fixtures/headings-article-content";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";
import articleContentWithLink from "../fixtures/link-text-article-content";
import articleContentWithItalicLink from "../fixtures/italic-link-article-content";
import articleContentWithTextAndBoldLink from "../fixtures/text-bold-link-article-content";
import articleContentWithMixedLink from "../fixtures/mixed-link-article-content";
import articleContentWithBoldItalicText from "../fixtures/boldItalic-text-article-content";
import {
  paragraphStartingWithSingleQuote,
  paragraphStartingWithDoubleQuote
} from "../fixtures/dropcap-article-content";

jest.mock("@times-components/save-and-share-bar", () => "SaveAndShareBar");

export const renderArticle = (data, header = null) => (
  <ContextProviderWithDefaults
    value={{
      theme: { scale: scales.medium, sectionColour: "#FF0000" },
      user: { isLoggedIn: true }
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
      spotAccountId=""
    />
  </ContextProviderWithDefaults>
);

export const fixtureArgs = {
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
        imageIndex: 1,
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
        imageIndex: 2,
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
        imageIndex: 3,
        ratio: "1500:1000",
        url: "https://image.io/inline"
      },
      children: [],
      name: "image"
    },
    {
      attributes: {},
      name: "paragraph",
      children: [
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
        }
      ]
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
        id: "3dbfe6b8-680b-11e9-b277-88f3d445182c",
        is360: false,
        brightcoveAccountId: "57838016001",
        brightcovePolicyKey: "1.2.3.4",
        brightcoveVideoId: "4084164751001",
        brightcovePlayerId: "default",
        caption: "This is video caption",
        display: "primary",
        imageIndex: 4,
        posterImageId: "0c0309d4-1aeb-11e8-9010-1eef6ba5d3de",
        posterImageUrl: "https://image.io"
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
    },
    {
      name: "heading2",
      children: [
        {
          name: "text",
          children: [],
          attributes: {
            value: "This is heading 2"
          }
        }
      ]
    },
    {
      name: "heading3",
      children: [
        {
          name: "text",
          children: [],
          attributes: {
            value: "This is heading 3"
          }
        }
      ]
    },
    {
      name: "heading4",
      children: [
        {
          name: "text",
          children: [],
          attributes: {
            value: "This is heading 4"
          }
        }
      ]
    },
    {
      name: "heading5",
      children: [
        {
          name: "text",
          children: [],
          attributes: {
            value: "This is heading 5"
          }
        }
      ]
    },
    {
      name: "heading6",
      children: [
        {
          name: "text",
          children: [],
          attributes: {
            value: "This is heading 6"
          }
        }
      ]
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
    name: "an article with interactives",
    test() {
      const article = articleFixture({
        ...fixtureArgs,
        content: [
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
              display: "fullwidth",
              element: {
                attributes: {
                  "chart-id": "csmgb"
                },
                value: "times-datawrapper"
              },
              id: "abc",
              url: "https://interactive.io"
            },
            children: [],
            name: "interactive"
          }
        ]
      });
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
    name: "an article with no content if content is set as null",
    test() {
      const article = articleFixture({ ...fixtureArgs, content: null });
      const output = renderComponent(renderArticle(article));

      expect(output).toMatchSnapshot();
    }
  },
  {
    name:
      "an article with a nested markup in first paragraph displays a drop cap",
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
  },
  {
    name: "an article with heading tags",
    test() {
      const article = articleFixture({
        ...fixtureArgs,
        content: contentWithHeadingTags
      });
      const output = renderComponent(renderArticle(article));

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an article with link",
    test() {
      const article = articleFixture({
        ...fixtureArgs,
        content: articleContentWithLink
      });
      const output = renderComponent(renderArticle(article));

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an article with italic link",
    test() {
      const article = articleFixture({
        ...fixtureArgs,
        content: articleContentWithItalicLink
      });
      const output = renderComponent(renderArticle(article));

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an article with bold text followed by bold link",
    test() {
      const article = articleFixture({
        ...fixtureArgs,
        content: articleContentWithTextAndBoldLink
      });
      const output = renderComponent(renderArticle(article));

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an article with italic and normal text link",
    test() {
      const article = articleFixture({
        ...fixtureArgs,
        content: articleContentWithMixedLink
      });
      const output = renderComponent(renderArticle(article));

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an article with bold and italic text at the same time",
    test() {
      const article = articleFixture({
        ...fixtureArgs,
        content: articleContentWithBoldItalicText
      });
      const output = renderComponent(renderArticle(article));

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an article starting with single quote",
    test() {
      const article = articleFixture({
        ...fixtureArgs,
        content: paragraphStartingWithSingleQuote,
        template: "maincomment"
      });
      const output = renderComponent(renderArticle(article));

      expect(output).toMatchSnapshot();
    }
  },
  {
    name: "an article starting with double quote",
    test() {
      const article = articleFixture({
        ...fixtureArgs,
        content: paragraphStartingWithDoubleQuote,
        template: "maincomment"
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
