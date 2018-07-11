import React from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import VideoLabel from "../src/video-label";

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(print, minimalNativeTransform, flattenStyleTransform)
  );

  it("1. video label with a title", () => {
    const wrapper = shallow(<VideoLabel color="#008347" title="swimming" />);

    expect(wrapper).toMatchSnapshot();
  });

  it("2. video label without a title shows VIDEO", () => {
    const wrapper = shallow(<VideoLabel color="#008347" />);

    expect(wrapper).toMatchSnapshot();
  });

  it("3. video label with the black default colour", () => {
    const wrapper = shallow(<VideoLabel />);

    expect(wrapper).toMatchSnapshot();
  });
};
