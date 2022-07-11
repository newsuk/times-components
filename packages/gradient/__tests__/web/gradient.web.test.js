import React from "react";

import { TcText } from "@times-components/utils";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import Gradient from "../../src/gradient";

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    print,
    minimaliseTransform((value, key) => key === "style"),
    minimalWebTransform
  )
);

const tests = [
  {
    name: "gradient with a child",
    test() {
      expect(
        mount(
          <Gradient>
            <TcText>Hello world!</TcText>
          </Gradient>
        )
      ).toMatchSnapshot();
    }
  }
];

iterator(tests);
