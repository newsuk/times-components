import React from "react";
import { shallow } from "enzyme";
import { createHash } from "crypto";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  minimaliseTransform,
  minimalNativeTransform,
  print,
  replacePropTransform
} from "@times-components/jest-serializer";
import Watermark from "../src/watermark";

export default () => {
  const hash = v =>
    createHash("md5")
      .update(v)
      .digest("hex");

  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      print,
      minimaliseTransform(
        (value, key) => key === "source"
      ),
      minimalNativeTransform,
      replacePropTransform((value, key) => (key === "d" ? hash(value) : value))
    )
  );

  it("1. watermark", () => {
    const wrapper = shallow(<Watermark height={250} width={300} />);

    expect(wrapper).toMatchSnapshot();
  });
};
