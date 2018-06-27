import "react-native";
import React from "react";
import ArticleImage from "../src/article-image";

const testImageUrl = "https://imageserver/someImage";

export default makeTest => {
  it("does not render an image if display is not received", () => {
    const noDisplay = {
      imageOptions: {
        display: null,
        ratio: "16:9",
        url: testImageUrl
      }
    };

    expect(
      makeTest(<ArticleImage imageOptions={noDisplay.imageOptions} />)
    ).toMatchSnapshot("1. does not render an image if display is not received");
  });

  it("does not render an image if ratio is not received", () => {
    const noRatio = {
      imageOptions: {
        display: "primary",
        ratio: null,
        url: testImageUrl
      }
    };

    expect(
      makeTest(<ArticleImage imageOptions={noRatio.imageOptions} />)
    ).toMatchSnapshot("2. does not render an image if ratio is not received");
  });

  it("renders an image with no caption", () => {
    const primaryImageNoCaptionProps = {
      imageOptions: {
        display: "primary",
        ratio: "16:9",
        url: testImageUrl
      }
    };

    expect(
      makeTest(
        <ArticleImage imageOptions={primaryImageNoCaptionProps.imageOptions} />
      )
    ).toMatchSnapshot("3. renders an image with no caption");
  });

  it("renders a caption if received", () => {
    const noCredits = {
      imageOptions: {
        display: null,
        ratio: "16:9",
        url: testImageUrl
      },
      captionOptions: {
        caption: "Some caption",
        credits: null
      }
    };

    expect(
      makeTest(
        <ArticleImage
          imageOptions={noCredits.imageOptions}
          captionOptions={noCredits.captionOptions}
        />
      )
    ).toMatchSnapshot("4. renders a caption if received");
  });

  it("renders a credit if received", () => {
    const noCredits = {
      imageOptions: {
        display: null,
        ratio: "16:9",
        url: testImageUrl
      },
      captionOptions: {
        caption: null,
        credits: "Some credit"
      }
    };

    expect(
      makeTest(
        <ArticleImage
          imageOptions={noCredits.imageOptions}
          captionOptions={noCredits.captionOptions}
        />
      )
    ).toMatchSnapshot("5. renders a credit if received");
  });
};
