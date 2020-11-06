import insertNativeAd from "../../src/native-ad.web";
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

  it("if paywall does not exist the original content is returned", () => {
    expect(insertNativeAd(contentIncludesPaywall)).toEqual(
      contentIncludesPaywall
    );
  });
});
