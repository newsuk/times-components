import React from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  minimaliseTransform,
  print
} from "@times-components/jest-serializer";
import PlayIcon from "../src/play-icon";

export default () => {
  it("play icon", () => {
    addSerializers(
      expect,
      enzymeTreeSerializer(),
      compose(print, minimaliseTransform((value, key) => key === "style"))
    );

    const wrapper = shallow(<PlayIcon />);

    expect(wrapper).toMatchSnapshot();
  });
};
