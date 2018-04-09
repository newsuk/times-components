import getLeadAsset, { defaultAsset } from "../article-lead-asset/get-lead-asset";

export default () => {
  it("getLeadAsset() returns a default object when no leadAsset provided", () => {
    expect(getLeadAsset({leadAsset: false})).toEqual(defaultAsset);
  });
};
