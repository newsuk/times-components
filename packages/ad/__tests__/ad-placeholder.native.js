import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import AdPlaceholder from "../src/ad-placeholder";

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

  it("should render an advert placeholder", () => {
    const testInstance = TestRenderer.create(
      <AdPlaceholder height={300} width={970} />
    );

    expect(testInstance).toMatchSnapshot("1. Advert placeholder");
  });
};
