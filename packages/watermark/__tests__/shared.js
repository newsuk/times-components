import React from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import { replaceLongKeys } from "@times-components/test-utils";
import Watermark from "../src/watermark";

jest.mock("../assets/watermark.png", () => ({ uri: "watermark-asset" }));

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(print, minimalNativeTransform, replaceLongKeys(new Set(["d"])))
  );

  it("1. watermark", () => {
    const wrapper = shallow(<Watermark height={250} width={300} />);

    expect(wrapper).toMatchSnapshot();
  });
};
