import React from "react";
import { setIsTablet } from "@times-components/mocks/dimensions";
import Context from "@times-components/context";
import { iterator } from "@times-components/test-utils";
import ArticleImage from "../src/article-image";
import primaryImageFixture from "../fixtures/primary-image";
import secondaryImageFixture from "../fixtures/secondary-image";
import fullwidthImageFixture from "../fixtures/fullwidth-image";
import landscapeInlineImageFixture from "../fixtures/landscape-inline-image";
import portraitInlineImageFixture from "../fixtures/portrait-inline-image";

const testImageUrl = "https://img/someImage";
const primaryImage = primaryImageFixture(
  testImageUrl,
  "Some caption",
  "Some credits"
);
const fullwidthImage = fullwidthImageFixture(
  testImageUrl,
  "Some caption",
  "Some credits"
);
const secondaryImage = secondaryImageFixture(
  testImageUrl,
  "Another caption",
  "Other credits"
);
const landscapeInlineImage = landscapeInlineImageFixture(
  testImageUrl,
  "Landscape caption",
  "Landscape credits"
);
const portraitInlineImage = portraitInlineImageFixture(
  testImageUrl,
  "Portrait caption",
  "Portrait credits"
);

export default makeTest => {
  const tests = [
    {
      name: "mobile primary image with caption and credits",
      test: () => {
        expect(
          makeTest(
            <ArticleImage
              captionOptions={primaryImage.captionOptions}
              imageOptions={primaryImage.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    },
    {
      name: "tablet primary image with caption and credits",
      test: () => {
        setIsTablet(true);
        expect(
          makeTest(
            <ArticleImage
              captionOptions={primaryImage.captionOptions}
              imageOptions={primaryImage.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    },
    {
      name: "mobile fullwidth image with caption and credits",
      test: () => {
        expect(
          makeTest(
            <ArticleImage
              captionOptions={fullwidthImage.captionOptions}
              imageOptions={fullwidthImage.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    },
    {
      name: "tablet fullwidth image with caption and credits",
      test: () => {
        setIsTablet(true);
        expect(
          makeTest(
            <ArticleImage
              captionOptions={fullwidthImage.captionOptions}
              imageOptions={fullwidthImage.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    },
    {
      name: "secondary image with caption and credits",
      test: () => {
        expect(
          makeTest(
            <ArticleImage
              captionOptions={secondaryImage.captionOptions}
              imageOptions={secondaryImage.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    },
    {
      name: "inline image (landscape) with caption and credits",
      test: () => {
        expect(
          makeTest(
            <ArticleImage
              captionOptions={landscapeInlineImage.captionOptions}
              imageOptions={landscapeInlineImage.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    },
    {
      name: "inline image (portrait) with caption and credits",
      test: () => {
        expect(
          makeTest(
            <ArticleImage
              captionOptions={portraitInlineImage.captionOptions}
              imageOptions={portraitInlineImage.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    },
    {
      name:
        "primary image with caption and credits with center caption override",
      test: () => {
        expect(
          makeTest(
            <Context.Provider
              value={{
                theme: { imageCaptionAlignment: { primary: "center" } }
              }}
            >
              <ArticleImage
                captionOptions={primaryImage.captionOptions}
                imageOptions={primaryImage.imageOptions}
              />
            </Context.Provider>
          )
        ).toMatchSnapshot();
      }
    },
    {
      name:
        "secondary image with caption and credits with center caption override",
      test: () => {
        expect(
          makeTest(
            <Context.Provider
              value={{
                theme: { imageCaptionAlignment: { secondary: "center" } }
              }}
            >
              <ArticleImage
                captionOptions={secondaryImage.captionOptions}
                imageOptions={secondaryImage.imageOptions}
              />
            </Context.Provider>
          )
        ).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
