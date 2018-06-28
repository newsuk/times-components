import React, { Fragment } from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import Ad, { AdComposer } from "../src/ad";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimaliseTransform((value, key) => key === "style"),
      minimalNativeTransform,
      flattenStyleTransform
    )
  );

  it("one ad slot", () => {
    const testInstance = TestRenderer.create(
      <AdComposer>
        <Ad slotName="header" />
      </AdComposer>
    );

    expect(testInstance).toMatchSnapshot("1. Advert");
  });

  it("two ad slots", () => {
    const testInstance = TestRenderer.create(
      <AdComposer>
        <Fragment>
          <Ad slotName="header" />
          <Ad slotName="intervention" />
        </Fragment>
      </AdComposer>
    );

    expect(testInstance).toMatchSnapshot("2. Two adverts");
  });

  it("ad placeholder when isLoading prop is true", () => {
    const testInstance = TestRenderer.create(
      <AdComposer>
        <Ad isLoading slotName="header" />
      </AdComposer>
    );

    expect(testInstance).toMatchSnapshot("3. Advert loading state placeholder");
  });
};
