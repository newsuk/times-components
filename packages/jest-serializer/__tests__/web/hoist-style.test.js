import React from "react";
import { AppRegistry } from "react-native-web";
import { StyleSheet, Text } from "react-native";
import Enzyme, { mount } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  hoistStyle,
  hoistStyleTransform,
  rnwTransform,
  stylePrinter
} from "../../src";

Enzyme.configure({ adapter: new React16Adapter() });

const styles = StyleSheet.create({
  text: {
    color: "yellow"
  }
});

describe("hoist-style should", () => {
  it("hoist a style and leave existing props untouched", () => {
    addSerializers(expect, enzymeRenderedSerializer(), hoistStyle);

    const wrapper = mount(
      <Text foo="bar" style={[styles.text, { color: "red" }]}>
        Some text
      </Text>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("hoist a style as well as an rnw class", () => {
    addSerializers(
      expect,
      enzymeRenderedSerializer(),
      compose(
        stylePrinter,
        hoistStyleTransform,
        rnwTransform(AppRegistry, ["borderTopWidth"])
      )
    );

    const wrapper = mount(
      <Text foo="bar" style={[styles.text, { color: "red" }]}>
        Some text
      </Text>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
