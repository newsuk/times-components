import React from "react";
import { setIsTablet } from "@times-components/mocks/dimensions";
import { ContextProviderWithDefaults } from "@times-components/context";
import { iterator } from "@times-components/test-utils";
import ArticleImage from "../src/article-image";
import primaryImageFixture from "../fixtures/primary-image";
import secondaryImageFixture from "../fixtures/secondary-image";
import fullwidthImageFixture from "../fixtures/fullwidth-image";

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
      name:
        "primary image with caption and credits with center caption override",
      test: () => {
        expect(
          makeTest(
            <ContextProviderWithDefaults
              value={{
                theme: { imageCaptionAlignment: { primary: "center" } }
              }}
            >
              <ArticleImage
                captionOptions={primaryImage.captionOptions}
                imageOptions={primaryImage.imageOptions}
              />
            </ContextProviderWithDefaults>
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
            <ContextProviderWithDefaults
              value={{
                theme: { imageCaptionAlignment: { secondary: "center" } }
              }}
            >
              <ArticleImage
                captionOptions={secondaryImage.captionOptions}
                imageOptions={secondaryImage.imageOptions}
              />
            </ContextProviderWithDefaults>
          )
        ).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
