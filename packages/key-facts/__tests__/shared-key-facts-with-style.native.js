import React from "react";
import TestRenderer from "react-test-renderer";
import Context from "@times-components/context";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import { scales } from "@times-components/styleguide";
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

  it("key facts with title and context theme", () => {
    const scale = scales.large;
    const sectionColour = "#FFFFFF";

    const testInstance = TestRenderer.create(
      <Context.Provider value={{ theme: { scale, sectionColour } }}>
        <KeyFacts ast={data} onLinkPress={() => {}} />
      </Context.Provider>
    );

    expect(testInstance).toMatchSnapshot();
  });
};
