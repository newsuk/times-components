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
import { OverlayGradient } from "../../src/gradient";

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
    name: "overlay gradient with a child",
    test() {
      expect(
        mount(
          <OverlayGradient>
            <TcText>Hello world!</TcText>
          </OverlayGradient>
        )
      ).toMatchSnapshot();
    }
  }
];

iterator(tests);
