import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
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

  const tests = [
    {
      name: "gradient with no angle",
      test() {
        const testInstance = TestRenderer.create(<Gradient />);

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "gradient with an angle (-45)",
      test() {
        const testInstance = TestRenderer.create(<Gradient degrees={-45} />);

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "gradient with an angle (45)",
      test() {
        const testInstance = TestRenderer.create(<Gradient degrees={45} />);

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "gradient with an angle (90)",
      test() {
        const testInstance = TestRenderer.create(<Gradient degrees={90} />);

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "gradient with an angle (180)",
      test() {
        const testInstance = TestRenderer.create(<Gradient degrees={180} />);

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "gradient with an angle (270)",
      test() {
        const testInstance = TestRenderer.create(<Gradient degrees={270} />);

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "gradient with custom colours",
      test: () => {
        const output = TestRenderer.create(
          <Gradient endColour="#00FFFF" startColour="#FF0000" />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "gradient with custom points",
      test: () => {
        const output = TestRenderer.create(
          <Gradient endPoint="0.8" startPoint="0.2" />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
