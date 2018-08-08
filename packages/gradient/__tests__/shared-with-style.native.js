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
import { iterator } from "@times-components/test-utils";
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

  const tests = [
    {
      name: "gradient using prop styles",
      test() {
        const testInstance = TestRenderer.create(
          <Gradient
            style={{
              height: 200,
              width: 200
            }}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "gradient using array prop styles",
      test() {
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

        expect(testInstance).toMatchSnapshot();
      }
    },
    {
      name: "gradient using stylesheets",
      test() {
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

        expect(testInstance).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
