import React from "react";
import { TcText } from "@times-components/utils";
import renderer from "react-test-renderer";
import { addSerializers, enzymeRootSerializer, minimalWeb } from "../../src";
import shared from "../shared.minimal";

describe("The minimal serializer should", () => {
  describe("for web", () => {
    addSerializers(expect, enzymeRootSerializer(), minimalWeb);

    it("not remove className", () => {
      const styles = {
        colored: {
          color: "red"
        },
        padded: {
          padding: 1
        }
      };

      const component = (
        <TcText style={{ ...styles.colored, ...styles.padded }} />
      );
      const tree = renderer.create(component);

      expect(tree.toJSON()).toMatchSnapshot();
    });

    shared();
  });
});
