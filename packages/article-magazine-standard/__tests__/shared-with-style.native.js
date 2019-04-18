import React from "react";
import TestRenderer from "react-test-renderer";
import { ContextProviderWithDefaults } from "@times-components/context";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import { themeFactory } from "@times-components/styleguide";
import { setIsTablet } from "./mocks.native";
import ArticleMagazineStandard from "../src/article-magazine-standard";
import articleFixture, { testFixture } from "../fixtures/full-article";
import sharedProps from "./shared-props";

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

const themeForSection = section => ({
  theme: {
    ...themeFactory(section, "magazinestandard"),
    scale: "medium"
  }
});

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

  it("phone full article with style", () => {
    const testRenderer = TestRenderer.create(
      <ArticleMagazineStandard {...sharedProps} article={article} />
    );

    expect(testRenderer).toMatchSnapshot();
  });

  it("tablet full article with style", () => {
    setIsTablet(true);
    const testRenderer = TestRenderer.create(
      <ArticleMagazineStandard {...sharedProps} article={article} />
    );

    expect(testRenderer).toMatchSnapshot();
  });

  it("full article with style in the culture magazine", () => {
    const testRenderer = TestRenderer.create(
      <ContextProviderWithDefaults value={themeForSection("culture")}>
        <ArticleMagazineStandard {...sharedProps} article={article} />
      </ContextProviderWithDefaults>
    );

    expect(testRenderer).toMatchSnapshot();
  });

  it("full article with style in the style magazine", () => {
    const testRenderer = TestRenderer.create(
      <ContextProviderWithDefaults value={themeForSection("style")}>
        <ArticleMagazineStandard {...sharedProps} article={article} />
      </ContextProviderWithDefaults>
    );

    expect(testRenderer).toMatchSnapshot();
  });

  it("full article with style in the sunday times magazine", () => {
    const testRenderer = TestRenderer.create(
      <ContextProviderWithDefaults
        value={themeForSection("thesundaytimesmagazine")}
      >
        <ArticleMagazineStandard {...sharedProps} article={article} />
      </ContextProviderWithDefaults>
    );

    expect(testRenderer).toMatchSnapshot();
  });
};
