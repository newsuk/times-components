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
          captionOptions={primaryImage.captionOptions}
          imageOptions={primaryImage.imageOptions}
        />
      )
    ).toMatchSnapshot("1. renders primary image with caption and credits"));

  it("renders secondary image with caption and credits", () =>
    expect(
      makeTest(
        <ArticleImage
          captionOptions={secondaryImage.captionOptions}
          imageOptions={secondaryImage.imageOptions}
        />
      )
    ).toMatchSnapshot("2. renders secondary image with caption and credits"));

  it("renders inline image (landscape) with caption and credits", () =>
    expect(
      makeTest(
        <ArticleImage
          captionOptions={landscapeInlineImage.captionOptions}
          imageOptions={landscapeInlineImage.imageOptions}
        />
      )
    ).toMatchSnapshot(
      "3. renders inline image (landscape) with caption and credits"
    ));

  it("renders inline image (portrait) with caption and credits", () =>
    expect(
      makeTest(
        <ArticleImage
          captionOptions={portraitInlineImage.captionOptions}
          imageOptions={portraitInlineImage.imageOptions}
        />
      )
    ).toMatchSnapshot(
      "4. renders inline image (portrait) with caption and credits"
    ));
};
