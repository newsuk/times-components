import React from "react";
import { StyleSheet, Text } from "react-native";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  hoistStyleTransform,
  minimaliseTransform,
  minimalWebTransform,
  print,
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
    rnwTransform(["backgroundColor"])
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
  },
  {
    name: "gradient with a child",
    test() {
      addSerializers(
        expect,
        compose(
          print,
          minimaliseTransform((value, key) => key === "style"),
          minimalWebTransform,
          rnwTransform()
        )
      );

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
