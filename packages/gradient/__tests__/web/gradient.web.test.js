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
} from "@times-components-native/jest-serializer";
import { iterator } from "@times-components-native/test-utils";
import Gradient from "../../src/gradient";

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
    name: "gradient with a child",
    test() {
      expect(
        mount(
          <Gradient>
            <Text>Hello world!</Text>
          </Gradient>
        )
      ).toMatchSnapshot();
    }
  }
];

iterator(tests);
