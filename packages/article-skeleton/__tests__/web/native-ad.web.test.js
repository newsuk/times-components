import insertNativeAd from "../../src/native-ad.web";
import nativeAdFixture from "../../fixtures/native-ad";
const { content, contentWithAd } = nativeAdFixture;

describe('native-ad', () => {
	it('it adds the native ad block after the 6th paywall paragraph', () => {
		expect(insertNativeAd(content)).toStrictEqual(contentWithAd);
	})
})