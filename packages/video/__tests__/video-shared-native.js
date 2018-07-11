import React from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import Video from "../src/video";
import defaultVideoProps from "./default-video-props";

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(print, flattenStyleTransform, minimalNativeTransform)
  );

  it("1. video", () => {
    const wrapper = shallow(<Video {...defaultVideoProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("2. video without a poster image", () => {
    const wrapper = shallow(<Video {...defaultVideoProps} poster={null} />);
    expect(wrapper).toMatchSnapshot();
  });

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
