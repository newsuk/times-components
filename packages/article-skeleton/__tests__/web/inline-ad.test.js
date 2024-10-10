import insertInlineAd from "../../src/contentModifiers/inline-ad";
import inlineAdFixture from "../../fixtures/inline-ad";

const {
  contentWithOutAd,
  contentWithAd,
  contentWithLessParagraphs
} = inlineAdFixture;

describe("inline-ad", () => {
  it("it adds the inline ad block after the 13th paragraph", () => {
    expect(insertInlineAd(false)(contentWithOutAd)).toStrictEqual(
      contentWithAd
    );
  });

  it("does not insert inline ad if less than 13 paragraphs", () => {
    expect(insertInlineAd(false)(contentWithLessParagraphs)).toEqual(
      contentWithLessParagraphs
    );
  });

  it("does not insert the ad if already exists", () => {
    expect(insertInlineAd(false)(contentWithOutAd)).toStrictEqual(
      contentWithAd
    );
    expect(insertInlineAd(false)(contentWithOutAd)).toStrictEqual(
      contentWithAd
    );
  });
});
