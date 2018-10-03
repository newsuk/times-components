import React from "react";
import { AppRegistry } from "react-native-web";
import { Text } from "react-native";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  print,
  rnwTransform
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import { OverlayGradient } from "../../src/gradient";

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    print,
    minimaliseTransform((value, key) => key === "style"),
    minimalWebTransform,
    rnwTransform(AppRegistry)
  )
);

const tests = [
  {
    name: "overlay gradient with a child",
    test() {
      expect(
        mount(
          <OverlayGradient>
            <Text>Hello world!</Text>
          </OverlayGradient>
        )
      ).toMatchSnapshot();
    }
  }
];

iterator(tests);
