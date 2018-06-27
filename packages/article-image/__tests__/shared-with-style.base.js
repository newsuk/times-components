import React from "react";
import ArticleImage from "../src/article-image";
import primaryImageFixture from "../fixtures/primary-image";
import secondaryImageFixture from "../fixtures/secondary-image";
import landscapeInlineImageFixture from "../fixtures/landscape-inline-image";
import portraitInlineImageFixture from "../fixtures/portrait-inline-image";

const testImageUrl = "https://imageserver/someImage";
const primaryImage = primaryImageFixture(
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
  it("renders primary image with caption and credits", () =>
    expect(
      makeTest(
        <ArticleImage
          imageOptions={primaryImage.imageOptions}
          captionOptions={primaryImage.captionOptions}
        />
      )
    ).toMatchSnapshot("1. renders primary image with caption and credits"));

  it("renders secondary image with caption and credits", () =>
    expect(
      makeTest(
        <ArticleImage
          imageOptions={secondaryImage.imageOptions}
          captionOptions={secondaryImage.captionOptions}
        />
      )
    ).toMatchSnapshot("2. renders secondary image with caption and credits"));

  it("renders inline image (landscape) with caption and credits", () =>
    expect(
      makeTest(
        <ArticleImage
          imageOptions={landscapeInlineImage.imageOptions}
          captionOptions={landscapeInlineImage.captionOptions}
        />
      )
    ).toMatchSnapshot(
      "3. renders inline image (landscape) with caption and credits"
    ));

  it("renders inline image (portrait) with caption and credits", () =>
    expect(
      makeTest(
        <ArticleImage
          imageOptions={portraitInlineImage.imageOptions}
          captionOptions={portraitInlineImage.captionOptions}
        />
      )
    ).toMatchSnapshot(
      "4. renders inline image (portrait) with caption and credits"
    ));
};
