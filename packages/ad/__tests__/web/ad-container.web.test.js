import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import AdContainer from "../../src/ad-container.web";

describe("ad-container", () => {
  addSerializers(
    expect,
    compose(
      print,
      minimaliseTransform((value, key) => key === "style"),
      minimalNativeTransform
    )
  );

  it("header ad", () => {
    const testInstance = TestRenderer.create(<AdContainer slotName="header" />);
    expect(testInstance).toMatchSnapshot();
  });
  it("inline ad", () => {
    const testInstance = TestRenderer.create(
      <AdContainer slotName="inline-ad" />
    );
    expect(testInstance).toMatchSnapshot();
  });
  it("pixel ad", () => {
    const testInstance = TestRenderer.create(<AdContainer slotName="pixel" />);
    expect(testInstance).toMatchSnapshot();
  });
  it("pixelteads ad", () => {
    const testInstance = TestRenderer.create(
      <AdContainer slotName="pixelteads" />
    );
    expect(testInstance).toMatchSnapshot();
  });
  it("pixelskin ad", () => {
    const testInstance = TestRenderer.create(
      <AdContainer slotName="pixelskin" />
    );
    expect(testInstance).toMatchSnapshot();
  });
});
