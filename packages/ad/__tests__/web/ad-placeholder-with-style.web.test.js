import React from "react";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  hoistStyleTransform,
  justChildren,
  meltNative,
  minimalWebTransform,
  propsNoChildren,
  replaceTransform,
  stylePrinter,
  rnwTransform
} from "@times-components/jest-serializer";
import AdPlaceholder from "../../src/ad-placeholder";

const style = {
  backgroundColor: "red"
};

describe("web", () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      stylePrinter,
      flattenStyleTransform,
      hoistStyleTransform,
      minimalWebTransform,
      replaceTransform({
        Watermark: propsNoChildren
      }),
      rnwTransform()
    )
  );

  it("should render an advert placeholder", () => {
    const wrapper = mount(<AdPlaceholder height={300} style={style} width={970} />);

    expect(wrapper).toMatchSnapshot("1. Advert placeholder");
  });
});
