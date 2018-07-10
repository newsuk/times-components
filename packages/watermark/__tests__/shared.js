import React from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import Watermark from "../src/watermark";

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      print,
      minimaliseTransform(
        (value, key) => key === "d" || key === "id" || key === "source"
      ),
      minimalNativeTransform
    )
  );

  it("1. watermark", () => {
    const wrapper = shallow(<Watermark height={250} width={300} />);

    expect(wrapper).toMatchSnapshot();
  });
};
