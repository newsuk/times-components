import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import { setIsTablet } from "./mocks.native";
import ArticleMainStandard from "../src/article-main-standard";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";
import articleProps from "./shared-article-props";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key !== "style"),
      flattenStyleTransform
    )
  );

  it("full article with style on mobile", () => {
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
          attributes: {},
          children: [
            {
              attributes: {
                value: "Some content"
              },
              children: [],
              name: "text"
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
            posterImageId: "0c0309d4-1aeb-11e8-9010-1eef6ba5d3de",
            posterImageUrl: "https://image.io"
          },
          children: [],
          name: "video"
        },
        {
          attributes: {},
          children: [],
          name: "ad"
        },
        {
          attributes: {
            caption: "A Caption",
            credits: "Some Credits",
            display: "secondary",
            ratio: "3:2",
            url: "https://image-2.io"
          },
          children: [],
          name: "image"
        },
        {
          attributes: {
            caption: "A Caption",
            credits: "Some Credits",
            display: "inline",
            ratio: "9:4",
            url: "https://image-inline.io"
          },
          children: [],
          name: "image"
        }
      ]
    });

    const output = TestRenderer.create(
      <ArticleMainStandard
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
  });

  it("full article with style on tablet", () => {
    setIsTablet(true);

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
          attributes: {},
          children: [
            {
              attributes: {
                value: "Some content"
              },
              children: [],
              name: "text"
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
            posterImageId: "0c0309d4-1aeb-11e8-9010-1eef6ba5d3de",
            posterImageUrl: "https://image.io"
          },
          children: [],
          name: "video"
        },
        {
          attributes: {},
          children: [],
          name: "ad"
        },
        {
          attributes: {
            caption: "A Caption",
            credits: "Some Credits",
            display: "secondary",
            ratio: "3:2",
            url: "https://image-2.io"
          },
          children: [],
          name: "image"
        },
        {
          attributes: {
            caption: "A Caption",
            credits: "Some Credits",
            display: "inline",
            ratio: "9:4",
            url: "https://image-inline.io"
          },
          children: [],
          name: "image"
        }
      ]
    });

    const output = TestRenderer.create(
      <ArticleMainStandard
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
  });
};
