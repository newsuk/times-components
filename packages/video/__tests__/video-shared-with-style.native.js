import React from "react";
import { shallow } from "enzyme";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import Video from "../src/video";
import defaultVideoProps from "./default-video-props";

jest.mock("@times-components/image", () => "Image");
// eslint-disable-next-line global-require
jest.mock("@times-components/svgs", () => require("./mock-svg"));

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      flattenStyleTransform,
      minimaliseTransform((value, key) => key !== "style")
    )
  );

  const tests = [
    {
      name: "video",
      test: () => {
        const testInstance = TestRenderer.create(
          <Video {...defaultVideoProps} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "video without a poster image",
      test: () => {
        const testInstance = TestRenderer.create(
          <Video {...defaultVideoProps} poster={null} />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);

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
