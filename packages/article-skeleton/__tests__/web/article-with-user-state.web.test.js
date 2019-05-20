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
import { scales } from "@times-components/styleguide";

import "../mocks.web";
import Context from "@times-components/context";

import { adConfig } from "../ad-mock";
import articleFixture, { testFixture } from "../../fixtures/full-article";
import ArticleSkeleton from "../../src/article-skeleton";
import articleSkeletonProps from "../shared-article-skeleton-props";

const omitProps = new Set([
  "article",
  "className",
  "data-testid",
  "responsiveLinkStyles",
  "style"
]);

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    print,
    minimalWebTransform,
    minimaliseTransform((value, key) => omitProps.has(key))
  )
);

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
      children: [
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
      ],
      name: "paywall"
    }
  ]
});

const renderArticle = userState => (
  <Context.Provider
    value={{
      theme: { scale: scales.medium, sectionColour: "#FF0000" },
      user: userState || {}
    }}
  >
    <ArticleSkeleton
      {...articleSkeletonProps}
      adConfig={adConfig}
      analyticsStream={() => {}}
      data={article}
      onAuthorPress={() => {}}
      onLinkPress={() => {}}
      onRelatedArticlePress={() => {}}
      onTopicPress={() => {}}
      onTwitterLinkPress={() => {}}
      onVideoPress={() => {}}
      spotAccountId=""
    />
  </Context.Provider>
);

describe("Article with user state", () => {
  it("Render full article when user is logged in", () => {
    const userState = {
      isLoggedIn: true
    };

    const nuk = {
      user: userState
    };
    window.nuk = nuk;

    const output = TestRenderer.create(renderArticle(userState));

    expect(output).toMatchSnapshot();
  });

  it("Render teaser article when user is not logged in", () => {
    const userState = {
      isLoggedIn: false
    };

    const nuk = {
      user: userState
    };
    window.nuk = nuk;

    const output = TestRenderer.create(renderArticle(userState));

    expect(output).toMatchSnapshot();
  });

  it("Render teaser article when user is null", () => {
    const nuk = {
      user: {}
    };
    window.nuk = nuk;

    const output = TestRenderer.create(renderArticle(null));

    expect(output).toMatchSnapshot();
  });

  it("Render Metered expired article when user is logged in and is metered expired", () => {
    const userState = {
      isLoggedIn: true,
      isMetered: false,
      isMeteredExpired: true
    };
    const nuk = {
      user: userState
    };

    window.nuk = nuk;

    const output = TestRenderer.create(renderArticle(userState));
    expect(output).toMatchSnapshot();
  });
});
