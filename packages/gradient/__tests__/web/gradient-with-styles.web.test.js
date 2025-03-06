import React from "react";

import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  hoistStyleTransform,
  minimalWebTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import Gradient from "../../src/gradient";

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    stylePrinter,
    hoistStyleTransform,
    minimalWebTransform
  )
);

const tests = [
  {
    name: "gradient with style",
    test() {
      const styles = {
        gradient: {
          backgroundColor: "red"
        }
      };

      expect(
        mount(<Gradient degrees={30} style={styles.gradient} />)
      ).toMatchSnapshot();
    }
  }
];

iterator(tests);
