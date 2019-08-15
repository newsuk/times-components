import React from "react";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalWebTransform,
  print,
  enzymeTreeSerializer
} from "@times-components/jest-serializer";
import { mount } from "enzyme";
import shared from "./shared.base";
import responsiveStyled from "../src/responsive-styled-components-native";

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      print,
      minimalWebTransform,
      minimaliseTransform(
        (value, key) =>
          key === "style" || key === "className" || key === "data-testid"
      )
    )
  );

  shared();

  it("the tree has the correct structure and display names", () => {
    const Responsive = responsiveStyled.View``;

    expect(mount(<Responsive />)).toMatchSnapshot();
  });
};
