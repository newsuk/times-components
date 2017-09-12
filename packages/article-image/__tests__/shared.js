/* eslint-env jest */

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
  it("does not render Article Image if id is not received", () => {
    const noId = [
      {
        name: "image",
        attributes: {
          id: null,
          display: "primary",
          caption: "All the latest stories in culture and books.",
          credits: "The credits",
          ratio: "16:9",
          url:
            "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F8c029716-97a2-11e7-8c3c-cb45202c3d59.jpg?crop=160%2C90%2C-0%2C-0"
        },
        children: []
      }
    ];

    const tree = renderer.create(<ArticleImage ast={noId} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("does not render Article Image display display is not received", () => {
    const noDisplay = [
      {
        name: "image",
        attributes: {
          id: "12345",
          display: null,
          caption: "All the latest stories in culture and books.",
          credits: "The credits",
          ratio: "16:9",
          url:
            "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F8c029716-97a2-11e7-8c3c-cb45202c3d59.jpg?crop=160%2C90%2C-0%2C-0"
        },
        children: []
      }
    ];

    const tree = renderer.create(<ArticleImage ast={noDisplay} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("does not render Article Image if ratio is not received", () => {
    const noRatio = [
      {
        name: "image",
        attributes: {
          id: "12345",
          display: "primary",
          caption: "All the latest stories in culture and books.",
          credits: "The credits",
          ratio: null,
          url:
            "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F8c029716-97a2-11e7-8c3c-cb45202c3d59.jpg?crop=160%2C90%2C-0%2C-0"
        },
        children: []
      }
    ];

    const tree = renderer.create(<ArticleImage ast={noRatio} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("does not render Article Image if url is not received", () => {
    const noUrl = [
      {
        name: "image",
        attributes: {
          id: "12345",
          display: "primary",
          caption: "All the latest stories in culture and books.",
          credits: "The credits",
          ratio: "16:9",
          url: null
        },
        children: []
      }
    ];

    const tree = renderer.create(<ArticleImage ast={noUrl} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("does not render Caption on Article Image if both caption and credits are not received", () => {
    const noId = [
      {
        name: "image",
        attributes: {
          id: "12345",
          display: "primary",
          caption: null,
          credits: null,
          ratio: "16:9",
          url:
            "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F8c029716-97a2-11e7-8c3c-cb45202c3d59.jpg?crop=160%2C90%2C-0%2C-0"
        },
        children: []
      }
    ];

    const tree = renderer.create(<ArticleImage ast={noId} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders primary image correctly", () => {
    const tree = renderer.create(<ArticleImage ast={primaryImage} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders secondary image correctly", () => {
    const tree = renderer
      .create(<ArticleImage ast={secondaryImage} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders inline image (landscape) correctly", () => {
    const tree = renderer
      .create(<ArticleImage ast={landscapeInlineImage} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders inline image (portrait) correctly", () => {
    const tree = renderer
      .create(<ArticleImage ast={portraitInlineImage} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
