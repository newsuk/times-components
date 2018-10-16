import React from "react";
import { StyleSheet, View } from "react-native";
import renderer from "react-test-renderer";
import { addSerializers, flattenStyle } from "../src";
import SomeComponent from "./some-component";

jest.mock("./some-component", () => "Placeholder");

export default () => {
  addSerializers(expect, flattenStyle);

  it("flatten styles", () => {
    const styles = StyleSheet.create({
      colored: {
        color: "red"
      },
      custom: {
        backgroundColor: "blue"
      },
      padded: {
        padding: 1
      }
    });

    const component = (
      <View>
        <SomeComponent style={[styles.colored, styles.padded]} />
      </View>
    );
    const tree = renderer.create(component);

    expect(tree.toJSON()).toMatchSnapshot();
  });
};
