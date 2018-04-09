import "react-native";
import React from "react";
import { shallow } from "enzyme";

import getLeadAsset, { defaultAsset } from "../article-lead-asset/get-lead-asset";
import ArticleLeadAssetVideo from "../article-lead-asset/article-lead-asset-video";

export default () => {
  it("getLeadAsset() returns a default object when no leadAsset provided", () => {
    expect(getLeadAsset({leadAsset: false})).toEqual(defaultAsset);
  });

  it("ArticleLeadAssetVideo onPress is handled correctly", () => {
    const props = {
      brightcoveVideoId: "testVideoId",
      brightcovePolicyKey: "testPolicyKey",
      brightcoveAccountId: "testAccountId"
    };
    const urlObject = {
      crop: {
        ratio: "1",
        url: "www.test.com"
      }
    };
    const onPressMock = jest.fn();
    const component = shallow(
      <ArticleLeadAssetVideo
        {...props}
        posterImage={urlObject}
        onVideoPress={onPressMock}
      />
    );
    const eventObject = { event: true };
    component.simulate('press', eventObject);
    expect(onPressMock).toHaveBeenCalledWith(eventObject, props);
  });
};
