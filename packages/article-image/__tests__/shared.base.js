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
    ).toMatchSnapshot();
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
    ).toMatchSnapshot();
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
    ).toMatchSnapshot();
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
    ).toMatchSnapshot();
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
    ).toMatchSnapshot();
  });
};
