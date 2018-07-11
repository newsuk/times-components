import React from "react";
import { shallow } from "enzyme";
import { createHash } from "crypto";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  minimalNativeTransform,
  print,
  replacePropTransform
} from "@times-components/jest-serializer";
import Watermark from "../src/watermark";

jest.mock("../assets/watermark.png", () => ({ uri: "watermark-asset" }));

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
      minimalNativeTransform,
      replacePropTransform((value, key) => (key === "d" ? hash(value) : value))
    )
  );

  it("1. watermark", () => {
    const wrapper = shallow(<Watermark height={250} width={300} />);

    expect(wrapper).toMatchSnapshot();
  });
};
