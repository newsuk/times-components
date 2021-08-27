import insertInlineAd from "../../src/contentModifiers/inline-ad";
import inlineAdFixture from "../../fixtures/inline-ad";

const {
  contentWithOutAd,
  contentWithAd,
  contentWithLessParagraphs
} = inlineAdFixture;

describe("inline-ad", () => {
  it("it adds the inline ad block after the 13th paragraph", () => {
    expect(insertInlineAd(contentWithOutAd)).toStrictEqual(contentWithAd);
  });

  it("does not insert inline ad if less than 13 paragraphs", () => {
    expect(insertInlineAd(contentWithLessParagraphs)).toEqual(
      contentWithLessParagraphs
    );
  });

  it("does not insert the ad if already exists", () => {
    expect(insertInlineAd(contentWithOutAd)).toStrictEqual(contentWithAd);
    expect(insertInlineAd(contentWithOutAd)).toStrictEqual(contentWithAd);
  });
});
