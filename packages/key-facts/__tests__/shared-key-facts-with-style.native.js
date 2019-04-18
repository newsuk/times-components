import React from "react";
import TestRenderer from "react-test-renderer";
import { ContextProviderWithDefaults } from "@times-components/context";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import { scales } from "@times-components/styleguide";
import { setIsTablet } from "@times-components/mocks/dimensions";
import KeyFacts from "../src/key-facts";
import dataWithTitle from "../fixtures/key-facts-test.json";
import dataWithoutTitle from "../fixtures/key-facts-no-title-test.json";

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

  it("key facts with title on mobile", () => {
    const testInstance = TestRenderer.create(
      <KeyFacts ast={dataWithTitle} onLinkPress={() => {}} />
    );

    expect(testInstance).toMatchSnapshot();
  });

  it("key facts with title on tablet", () => {
    setIsTablet(true);
    const testInstance = TestRenderer.create(
      <KeyFacts ast={dataWithTitle} onLinkPress={() => {}} />
    );

    expect(testInstance).toMatchSnapshot();
  });

  it("key facts without title on mobile", () => {
    const testInstance = TestRenderer.create(
      <KeyFacts ast={dataWithoutTitle} onLinkPress={() => {}} />
    );

    expect(testInstance).toMatchSnapshot();
  });

  it("key facts without title on tablet", () => {
    setIsTablet(true);
    const testInstance = TestRenderer.create(
      <KeyFacts ast={dataWithoutTitle} onLinkPress={() => {}} />
    );

    expect(testInstance).toMatchSnapshot();
  });

  it("key facts with title and context theme", () => {
    const scale = scales.large;
    const sectionColour = "#FFFFFF";

    const testInstance = TestRenderer.create(
      <ContextProviderWithDefaults value={{ theme: { scale, sectionColour } }}>
        <KeyFacts ast={dataWithTitle} onLinkPress={() => {}} />
      </ContextProviderWithDefaults>
    );

    expect(testInstance).toMatchSnapshot();
  });
};
