import {Text} from "react-native";
import React from "react";
import { shallow } from "enzyme";

import Video from "../src/video";
import Touchable from "../src/touchable";
import { defaultVideoProps } from "./shared";

export default () => {
  it("calls onVideoPress when the component is pressed", () => {
    const onVideoPress = jest.fn();
    const component = shallow(
      <Video {...defaultVideoProps} onVideoPress={onVideoPress} />
    );
    expect(onVideoPress).not.toHaveBeenCalled();
    component.simulate("press");
    expect(onVideoPress).toHaveBeenCalled();
  });

  it("Touchable invokes the onPress event handler", () => {
    const onPress = jest.fn();
    const component = shallow(
      <Touchable onPress={onPress}>
        <Text>Hello</Text>
      </Touchable>
    );
    component.simulate("press");
    expect(onPress).toHaveBeenCalled();
  });

  it("does not crash if not given an onVideoPress handler", () => {
    const videoProps = { ...defaultVideoProps };
    expect(videoProps.onVideoPress).not.toBeNull();
    delete videoProps.onVideoPress;
    const component = shallow(<Video {...videoProps} />);
    component.simulate("press");
  });
};
