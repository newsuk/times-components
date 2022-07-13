import React from "react";
import { TcText } from "@times-components/utils";
import renderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  minimalWebTransform,
  stylePrinter
} from "../../src";

describe("The serializers should", () => {
  it("minimalise and create styles", () => {
    addSerializers(
      expect,
      compose(
        stylePrinter,
        minimalWebTransform
      )
    );

    const styles = {
      colored: {
        color: "red"
      },
      padded: {
        padding: 1
      }
    };

    const component = (
      <TcText
        func={() => {}}
        style={{ ...styles.colored, ...styles.padded }}
        undef={undefined}
      />
    );
    const tree = renderer.create(component);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
