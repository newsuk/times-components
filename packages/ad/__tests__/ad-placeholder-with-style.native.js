import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import AdPlaceholder from "../src/ad-placeholder";

jest.mock("@times-components/watermark", () => "Watermark");

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(print, minimalNativeTransform, flattenStyleTransform)
  );

  it("advert placeholder", () => {
    const testInstance = TestRenderer.create(
      <AdPlaceholder height={300} width={970} />
    );

    expect(testInstance).toMatchSnapshot();
  });
};
