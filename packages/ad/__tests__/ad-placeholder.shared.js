import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import AdPlaceholder from "../src/ad-placeholder";

jest.mock("@times-components/watermark", () => "Watermark");

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimaliseTransform((value, key) => key === "style"),
      minimalNativeTransform
    )
  );

  it("advert placeholder", () => {
    const testInstance = TestRenderer.create(
      <AdPlaceholder height={300} width={970} />
    );

    expect(testInstance).toMatchSnapshot();
  });
};
