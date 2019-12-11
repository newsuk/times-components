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

  it("advert placeholder", () => {
    const testInstance = TestRenderer.create(<AdContainer slotName="header" />);

    expect(testInstance).toMatchSnapshot();
  });
});
