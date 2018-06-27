import React from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRootSerializer,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import AdPlaceholder from "../src/ad-placeholder";

export default () => {
  addSerializers(
    expect,
    enzymeRootSerializer(),
    compose(print, minimalNativeTransform, flattenStyleTransform)
  );

  it("should render an advert placeholder", () => {
    const wrapper = shallow(<AdPlaceholder height={300} width={970} />);

    expect(wrapper).toMatchSnapshot("1. Advert placeholder");
  });
};
