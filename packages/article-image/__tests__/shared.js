import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleImage from "../article-image";

const primaryImage = require("../fixtures/primary-image.json").fixture;
const secondaryImage = require("../fixtures/secondary-image.json").fixture;
const landscapeInlineImage = require("../fixtures/landscape-inline-image.json")
  .fixture;
const portraitInlineImage = require("../fixtures/portrait-inline-image.json")
  .fixture;

module.exports = () => {
  it("does not render Article Image if display is not received", () => {
    const noDisplay = {
      imageOptions: {
        display: null,
        ratio: "16:9",
        url:
          "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F8c029716-97a2-11e7-8c3c-cb45202c3d59.jpg?crop=160%2C90%2C-0%2C-0"
      },
      captionOptions: {
        caption: "All the latest stories in culture and books.",
        credits: "The credits"
      }
    };

    const tree = renderer
      .create(
        <ArticleImage
          imageOptions={noDisplay.imageOptions}
          captionOptions={noDisplay.captionOptions}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("does not render Article Image if ratio is not received", () => {
    const noRatio = {
      imageOptions: {
        display: "primary",
        ratio: null,
        url:
          "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F8c029716-97a2-11e7-8c3c-cb45202c3d59.jpg?crop=160%2C90%2C-0%2C-0"
      },
      captionOptions: {
        caption: "All the latest stories in culture and books.",
        credits: "The credits"
      }
    };

    const tree = renderer
      .create(
        <ArticleImage
          imageOptions={noRatio.imageOptions}
          captionOptions={noRatio.captionOptions}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders Article Image with no caption", () => {
    const primaryImageNoCaptionProps = {
      imageOptions: {
        display: "primary",
        ratio: "16:9",
        url:
          "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F8c029716-97a2-11e7-8c3c-cb45202c3d59.jpg?crop=160%2C90%2C-0%2C-0"
      }
    };

    const tree = renderer
      .create(
        <ArticleImage imageOptions={primaryImageNoCaptionProps.imageOptions} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("does not render Caption on Article Image if both caption and credits are not received", () => {
    const noCredits = {
      imageOptions: {
        display: "primary",
        ratio: "16:9",
        url:
          "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F8c029716-97a2-11e7-8c3c-cb45202c3d59.jpg?crop=160%2C90%2C-0%2C-0"
      },
      captionOptions: {
        caption: null,
        credits: null
      }
    };

    const tree = renderer
      .create(
        <ArticleImage
          imageOptions={noCredits.imageOptions}
          captionOptions={noCredits.captionOptions}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders primary image correctly", () => {
    const tree = renderer
      .create(
        <ArticleImage
          imageOptions={primaryImage.imageOptions}
          captionOptions={primaryImage.captionOptions}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders secondary image correctly", () => {
    const tree = renderer
      .create(
        <ArticleImage
          imageOptions={secondaryImage.imageOptions}
          captionOptions={secondaryImage.captionOptions}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders inline image (landscape) correctly", () => {
    const tree = renderer
      .create(
        <ArticleImage
          imageOptions={landscapeInlineImage.imageOptions}
          captionOptions={landscapeInlineImage.captionOptions}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders inline image (portrait) correctly", () => {
    const tree = renderer
      .create(
        <ArticleImage
          imageOptions={portraitInlineImage.imageOptions}
          captionOptions={portraitInlineImage.captionOptions}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
