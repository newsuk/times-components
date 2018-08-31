import React from "react";
import { iterator } from "@times-components/test-utils";
import ArticleImage from "../src/article-image";

const testImageUrl = "https://imageserver/someImage";

export default makeTest => {
  const tests = [
    {
      name: "does not render an image if display is not received",
      test: () => {
        const noDisplay = {
          imageOptions: {
            display: null,
            ratio: "16:9",
            uri: testImageUrl
          }
        };

        expect(
          makeTest(<ArticleImage imageOptions={noDisplay.imageOptions} />)
        ).toMatchSnapshot();
      }
    },
    {
      name: "does not render a primary image if ratio is not received",
      test: () => {
        const noRatio = {
          imageOptions: {
            display: "primary",
            ratio: null,
            uri: testImageUrl
          }
        };

        expect(
          makeTest(<ArticleImage imageOptions={noRatio.imageOptions} />)
        ).toMatchSnapshot();
      }
    },
    {
      name:
        "does not render an inline image with no ratio and no caption or credits",
      test: () => {
        const noRatio = {
          imageOptions: {
            display: "inline",
            ratio: null,
            uri: testImageUrl
          }
        };

        expect(
          makeTest(<ArticleImage imageOptions={noRatio.imageOptions} />)
        ).toMatchSnapshot();
      }
    },
    {
      name: "inline image with no ratio only shows caption and credits",
      test: () => {
        const noRatio = {
          imageOptions: {
            display: "inline",
            ratio: null,
            uri: testImageUrl
          },
          captionOptions: {
            caption: "Some caption",
            credits: "Some credit"
          }
        };

        expect(
          makeTest(
            <ArticleImage
              captionOptions={noRatio.captionOptions}
              imageOptions={noRatio.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    },
    {
      name: "image with no caption",
      test: () => {
        const primaryImageNoCaptionProps = {
          imageOptions: {
            display: "primary",
            ratio: "16:9",
            uri: testImageUrl
          }
        };

        expect(
          makeTest(
            <ArticleImage
              imageOptions={primaryImageNoCaptionProps.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    },
    {
      name: "image with no display only shows given caption",
      test: () => {
        const noCredits = {
          imageOptions: {
            display: null,
            ratio: "16:9",
            uri: testImageUrl
          },
          captionOptions: {
            caption: "Some caption",
            credits: null
          }
        };

        expect(
          makeTest(
            <ArticleImage
              captionOptions={noCredits.captionOptions}
              imageOptions={noCredits.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    },
    {
      name: "image with no display only shows given credits",
      test: () => {
        const noCredits = {
          imageOptions: {
            display: null,
            ratio: "16:9",
            uri: testImageUrl
          },
          captionOptions: {
            caption: null,
            credits: "Some credit"
          }
        };

        expect(
          makeTest(
            <ArticleImage
              captionOptions={noCredits.captionOptions}
              imageOptions={noCredits.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    },
    {
      name: "primary image renders with caption and credits",
      test: () => {
        const primaryImage = {
          imageOptions: {
            display: "primary",
            ratio: "16:9",
            uri: testImageUrl
          },
          captionOptions: {
            caption: "Some caption",
            credits: "Some credit"
          }
        };

        expect(
          makeTest(
            <ArticleImage
              captionOptions={primaryImage.captionOptions}
              imageOptions={primaryImage.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
