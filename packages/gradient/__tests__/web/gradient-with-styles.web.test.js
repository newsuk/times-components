import React from "react";
import { AppRegistry } from "react-native-web";
import { StyleSheet } from "react-native";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  hoistStyleTransform,
  minimalWebTransform,
  rnwTransform,
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
    minimalWebTransform,
    rnwTransform(AppRegistry, ["backgroundColor"])
  )
);

const tests = [
  {
    name: "gradient with style",
    test() {
      const styles = StyleSheet.create({
        gradient: {
          backgroundColor: "red"
        }
      });

      expect(
        mount(<Gradient degrees={30} style={styles.gradient} />)
      ).toMatchSnapshot();
    }
  }
];

iterator(tests);
