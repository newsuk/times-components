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
import Gradient from "../../src/gradient";

describe("web", () => {
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

  it("should render with the expected style", () => {
    const styles = StyleSheet.create({
      gradient: {
        backgroundColor: "red"
      }
    });

    expect(
      mount(<Gradient degrees={30} style={styles.gradient} />)
    ).toMatchSnapshot("1. should render with the expected style");
  });

  it("should render with a child", () => {
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
    ).toMatchSnapshot("2. should render with a child");
  });
});
