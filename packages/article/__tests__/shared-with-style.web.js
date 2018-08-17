import React from "react";
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
import Article from "../src/article";
import articleFixture, { testFixture } from "../fixtures/full-article";
import { adConfig } from "./ad-mock";

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
      rnwTransform(styles)
    )
  );

  // eslint-disable-next-line global-require
  require("jest-styled-components");

  it("full article with style", () => {
    const article = articleFixture({
      ...testFixture,
      content: [
        {
          name: "image",
          attributes: {
            display: "primary",
            ratio: "1500:1000",
            url: "https://image.io",
            caption: "An image caption",
            credits: "The image credits"
          },
          children: []
        },
        {
          name: "link",
          attributes: {
            href: "https://link.io",
            target: "_blank"
          },
          children: [
            {
              name: "text",
              attributes: {
                value: "Some Link"
              },
              children: []
            }
          ]
        },
        {
          name: "paragraph",
          attributes: {},
          children: [
            {
              name: "text",
              attributes: {
                value: "Some content"
              },
              children: []
            }
          ]
        },
        {
          name: "pullQuote",
          attributes: {
            content: "A pull quote",
            caption: {
              name: "AName",
              twitter: "@AName"
            }
          },
          children: []
        },
        {
          name: "video",
          attributes: {
            display: "primary",
            posterImageId: "0c0309d4-1aeb-11e8-9010-1eef6ba5d3de",
            brightcoveVideoId: "4084164751001",
            brightcovePolicyKey: "1.2.3.4",
            brightcoveAccountId: "57838016001",
            paidOnly: "false",
            caption: "This is video caption",
            posterImageUrl: "https://image.io"
          },
          children: []
        },
        {
          name: "ad",
          attributes: {},
          children: []
        },
        {
          name: "image",
          attributes: {
            display: "secondary",
            ratio: "3:2",
            url: "https://image-2.io",
            caption: "A Caption",
            credits: "Some Credits"
          },
          children: []
        },
        {
          name: "image",
          attributes: {
            display: "inline",
            ratio: "9:4",
            url: "https://image-inline.io",
            caption: "A Caption",
            credits: "Some Credits"
          },
          children: []
        }
      ]
    });

    const output = TestRenderer.create(
      <Article
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
