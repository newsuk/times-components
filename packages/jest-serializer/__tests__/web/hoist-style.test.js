import React from "react";
import { TcText } from "@times-components/utils";
import Enzyme, { mount } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  hoistStyle,
  hoistStyleTransform,
  stylePrinter
} from "../../src";

Enzyme.configure({ adapter: new React16Adapter() });

const styles = {
  text: {
    color: "yellow"
  }
};

describe("hoist-style should", () => {
  it("hoist a style and leave existing props untouched", () => {
    addSerializers(expect, enzymeRenderedSerializer(), hoistStyle);

    const wrapper = mount(
      <TcText foo="bar" style={{ ...styles.text, color: "red" }}>
        Some text
      </TcText>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("hoist a style as well as an rnw class", () => {
    addSerializers(
      expect,
      enzymeRenderedSerializer(),
      compose(
        stylePrinter,
        hoistStyleTransform
      )
    );

    const wrapper = mount(
      <TcText foo="bar" style={{ ...styles.text, color: "red" }}>
        Some text
      </TcText>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
