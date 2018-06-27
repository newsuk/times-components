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
import shared from "../ad-placeholder.shared";
import AdPlaceholder from "../../src/ad-placeholder";

describe("web", () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      stylePrinter,
      replaceTransform({
        AdPlaceholder: justChildren,
        Watermark: propsNoChildren,
        ...meltNative
      }),
      minimalWebTransform,
      hoistStyleTransform,
      rnwTransform()
    )
  );

  it("should render an advert placeholder", () => {
    const wrapper = mount(<AdPlaceholder height={300} width={970} />);

    expect(wrapper).toMatchSnapshot("1. Advert placeholder");
  });

  shared();
});
