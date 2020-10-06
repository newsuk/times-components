import insertNativeAd from "../../src/native-ad.web";
import nativeAdFixture from "../../fixtures/native-ad";
const { content, contentWithAd } = nativeAdFixture;

describe('native-ad', () => {

	it('it adds the native ad block after the 7th paywall paragraph', () => {
		expect(insertNativeAd(content)).toStrictEqual(contentWithAd);
	});

	// test('Checks nativeAd does not already exist and that Paywall does exist', () => {
	// 	const content = [
	// 		{
	// 			name: 'paywall',
	// 			children: []
	// 		},
	// 		{
	// 			name: 'paragraph',
	// 			children: []
	// 		}
	// 	]
	// 	expect(content).toEqual(
	// 		expect.arrayContaining([
	// 			expect.objectContaining({name: 'paywall'}),
	// 			expect.not.objectContaining({name: 'nativeAd'})
	// 		])
	// 	);
	// });

})