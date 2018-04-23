import React from "react";
import { shallow } from "enzyme";

import Video from "../src/video";
import { defaultVideoProps } from "./shared";

export default () => {
  it("calls onVideoPress when the component is pressed", () => {
    const onVideoPress = jest.fn();
    const component = shallow(
      <Video {...defaultVideoProps} onVideoPress={onVideoPress} />
    );
    expect(onVideoPress).not.toHaveBeenCalled();
    component.simulate("press");
    expect(onVideoPress).toHaveBeenCalledWith(undefined, {
      accountId: "[account id]",
      policyKey: "[policy key]",
      videoId: "[video id]"
    });
  });

  it("does not crash if not given an onVideoPress handler", () => {
    const videoProps = { ...defaultVideoProps };
    expect(videoProps.onVideoPress).not.toBeNull();
    delete videoProps.onVideoPress;
    const component = shallow(<Video {...videoProps} />);
    component.simulate("press");
  });
};
