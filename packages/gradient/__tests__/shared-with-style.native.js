import React from "react";
import { StyleSheet } from "react-native";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import Gradient from "../src/gradient";

export default () => {
  addSerializers(
    expect,
    compose(
      print,
      flattenStyleTransform,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key !== "style")
    )
  );

  it("renders using prop styles", () => {
    const testInstance = TestRenderer.create(
      <Gradient
        style={{
          height: 200,
          width: 200
        }}
      />
    );

    expect(testInstance).toMatchSnapshot("1. renders using prop styles");
  });

  it("renders using array prop styles", () => {
    const testInstance = TestRenderer.create(
      <Gradient
        style={[
          {
            height: 300
          },
          {
            width: 400
          }
        ]}
      />
    );

    expect(testInstance).toMatchSnapshot("2. renders using array prop styles");
  });

  it("renders using stylesheets", () => {
    const styles = StyleSheet.create({
      container: {
        margin: 10
      }
    });

    const testInstance = TestRenderer.create(
      <Gradient
        style={[
          styles.container,
          {
            height: 200
          },
          {
            width: 200
          }
        ]}
      />
    );

    expect(testInstance).toMatchSnapshot("3. renders using stylesheets");
  });
};
