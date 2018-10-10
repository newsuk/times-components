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
import "./mock-text-measure-module";
import DropCapWithContext from "../src/drop-cap-with-context";

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(print, minimalNativeTransform, flattenStyleTransform)
  );

  it("paragraph with single drop cap", () => {
    const testInstance = TestRenderer.create(
      <DropCapWithContext
        dropCap="I"
        text="n 1924 Harold Macmillan became MP for Stockton-on-Tees. Witnessing brutal poverty there between the wars, he said later that he had learnt “lessons which I have never forgotten. "
      />
    );

    expect(testInstance).toMatchSnapshot();
  });
};
