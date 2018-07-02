import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import Gradient from "../src/gradient";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      minimaliseTransform((value, key) => key !== "fill"),
      minimalNativeTransform
    )
  );

  it("renders with no angle", () => {
    const output = TestRenderer.create(<Gradient />);

    expect(output).toMatchSnapshot("1. renders with no angle");
  });

  it("renders with an angle (-45)", () => {
    const output = TestRenderer.create(<Gradient degrees={-45} />);

    expect(output).toMatchSnapshot("2. renders with an angle (-45)");
  });

  it("renders with an angle (45)", () => {
    const output = TestRenderer.create(<Gradient degrees={45} />);

    expect(output).toMatchSnapshot("3. renders with an angle (45)");
  });

  it("renders with an angle (90)", () => {
    const output = TestRenderer.create(<Gradient degrees={90} />);

    expect(output).toMatchSnapshot("4. renders with an angle (90)");
  });

  it("renders with an angle (180)", () => {
    const output = TestRenderer.create(<Gradient degrees={180} />);

    expect(output).toMatchSnapshot("5. renders with an angle (180)");
  });

  it("renders with an angle (270)", () => {
    const output = TestRenderer.create(<Gradient degrees={270} />);

    expect(output).toMatchSnapshot("6. renders with an angle (270)");
  });
};
