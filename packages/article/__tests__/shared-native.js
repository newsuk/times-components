import "react-native";

import getLeadAsset, {
  defaultAsset
} from "../src/article-lead-asset/get-lead-asset";
import listViewDataHelper from "../src/data-helper";

export default () => {
  it("should returns a default object when no leadAsset provided to getLeadAsset()", () => {
    expect(getLeadAsset({ leadAsset: false })).toEqual(defaultAsset);
  });

  it("should handles an empty leadAsset object when passed to listViewDataHelper()", () => {
    expect(
      listViewDataHelper({ content: [], leadAsset: false })
    ).toMatchSnapshot();
  });
};
