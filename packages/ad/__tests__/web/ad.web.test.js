import React, { Fragment } from "react";
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
import Ad, { AdComposer } from "../../src/ad";

describe("web", () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      stylePrinter,
      replaceTransform({
        DOMContext: justChildren,
        AdPlaceholder: propsNoChildren,
        ...meltNative
      }),
      minimalWebTransform,
      hoistStyleTransform,
      rnwTransform()
    )
  );

  it("one ad slot", () => {
    const wrapper = mount(
      <AdComposer>
        <Ad slotName="header" />
      </AdComposer>
    );

    expect(wrapper).toMatchSnapshot("1. Advert");
  });

  it("two ad slots", () => {
    const wrapper = mount(
      <AdComposer>
        <Fragment>
          <Ad slotName="header" />
          <Ad slotName="intervention" />
        </Fragment>
      </AdComposer>
    );

    expect(wrapper).toMatchSnapshot("2. Two adverts");
  });

  it("ad placeholder when isLoading prop is true", () => {
    const wrapper = mount(
      <AdComposer>
        <Ad isLoading slotName="header" />
      </AdComposer>
    );

    expect(wrapper).toMatchSnapshot("3. Advert loading state placeholder");
  });
});
