import insertNativeAd from "../../src/contentModifiers/native-ad";
import nativeAdFixture from "../../fixtures/native-ad";

const {
  contentWithOutAd,
  contentWithAd,
  contentWithoutParagraphs,
  contentIncludesPaywall
} = nativeAdFixture;

describe("native-ad", () => {
  it("it adds the native ad block after the 7th paywall paragraph", () => {
    expect(insertNativeAd(contentWithOutAd)).toStrictEqual(contentWithAd);
  });

  it("does not insert ad if less than 7 paragraphs in paywall", () => {
    expect(insertNativeAd(contentWithoutParagraphs)).toEqual(
      contentWithoutParagraphs
    );
  });

  it("if paywall does not exist the native ad is inserted after 2nd paragraph", () => {
    expect(insertNativeAd(contentIncludesPaywall)).toEqual(
      contentIncludesPaywall
    );
  });
});
