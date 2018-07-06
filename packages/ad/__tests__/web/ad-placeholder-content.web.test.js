import React from "react";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
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

describe("web", () => {
  addSerializers(
    expect,
    enzymeTreeSerializer()
  );

  it("should render an advert placeholder", () => {
    const wrapper = mount(<AdPlaceholder height={300} width={970} />);

    expect(wrapper).toMatchSnapshot("1. Advert placeholder");
  });
});
