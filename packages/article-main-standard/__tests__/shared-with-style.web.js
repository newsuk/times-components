import React from "react";
import { AppRegistry } from "react-native-web";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  hoistStyleTransform,
  minimaliseTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import "./mocks.web";
import ArticleMainStandard from "../src/article-main-standard";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";
import articleProps from "./shared-article-props";

const styles = [
  "alignItems",
  "flex",
  "flexBasis",
  "fontWeight",
  "justifyContent",
  "lineHeight",
  "marginBottom",
  "marginTop",
  "paddingBottom",
  "paddingTop"
];

export default () => {
  addSerializers(
    expect,
    compose(
      stylePrinter,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) => key !== "style" && key !== "className"
      ),
      flattenStyleTransform,
      hoistStyleTransform,
      rnwTransform(AppRegistry, styles)
    )
  );

  // eslint-disable-next-line global-require
  require("jest-styled-components");

  it("full article with style", () => {
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
