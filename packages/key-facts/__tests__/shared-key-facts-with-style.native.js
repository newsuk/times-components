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
import KeyFacts from "../src/key-facts";
import data from "../fixtures/key-facts-test.json";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      flattenStyleTransform,
      minimaliseTransform((value, key) => key !== "style"),
      minimalNativeTransform
    )
  );

  it("key facts with title", () => {
    const testInstance = TestRenderer.create(
      <KeyFacts ast={data} onLinkPress={() => {}} />
    );

    expect(testInstance).toMatchSnapshot();
  });
};
