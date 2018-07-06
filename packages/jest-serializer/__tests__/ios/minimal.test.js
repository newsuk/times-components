import { Text, StyleSheet } from "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { addSerializers, enzymeRootSerializer, minimalNative } from "../../src";
import shared from "../shared.minimal";

describe("The minimal serializer should", () => {
  describe("for native", () => {
    addSerializers(expect, enzymeRootSerializer(), minimalNative);

    it("not remove styles", () => {
      const { colored, padded } = StyleSheet.create({
        colored: {
          color: "red"
        },
        padded: {
          padding: 1
        }
      });

      const component = <Text style={[colored, padded]} />;
      const tree = renderer.create(component);

      expect(tree.toJSON()).toMatchSnapshot();
    });

    it("remove redundant native props", () => {
      const component = <Text href="some/web/link" />;
      const tree = renderer.create(component);

      expect(tree.toJSON()).toMatchSnapshot();
    });

    shared();
  });
});
