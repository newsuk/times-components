import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimalWebTransform,
  print,
  rnwTransform
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import renderKeyFacts from "../shared-render-key-facts";

addSerializers(expect, compose(print, minimalWebTransform, rnwTransform()));

// eslint-disable-next-line global-require
require("jest-styled-components");

const tests = [
  {
    name: "key facts with title",
    test: () => {
      const testInstance = TestRenderer.create(
        renderKeyFacts("New Brexit referendum")
      );

      expect(testInstance).toMatchSnapshot();
    }
  },
  {
    name: "key facts without title",
    test: () => {
      const testInstance = TestRenderer.create(renderKeyFacts());

      expect(testInstance).toMatchSnapshot();
    }
  }
];

iterator(tests);
