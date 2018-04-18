import "react-native";
import React from "react";
import { shallow } from "enzyme";
import BrightcoveVideo from "../src/brightcove-video";

import { defaultProps } from "./shared";

export default () => {
  it("renders correctly", () => {
    onVideoPress = jest.fn();
    const component = shallow(<BrightcoveVideo {...defaultProps} onVideoPress={onVideoPress} />);
    expect(onVideoPress).not.toHaveBeenCalled();
    component.simulate("press");
    expect(onVideoPress).toHaveBeenCalled();
  })
};
