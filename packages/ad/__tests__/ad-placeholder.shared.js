import React from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  compose,
  print,
  minimaliseTransform,
  enzymeRootSerializer
} from "@times-components/jest-serializer";
import AdPlaceholder from "../src/ad-placeholder";

export default () => {
  addSerializers(
    expect,
    enzymeRootSerializer(),
    compose(print, minimaliseTransform((value, key) => key === "style"))
  );

  it("should render the advert placeholder", () => {
    const wrapper = shallow(<AdPlaceholder height={300} width={970} />);

    expect(wrapper).toMatchSnapshot("1. advert placeholder");
  });
};
