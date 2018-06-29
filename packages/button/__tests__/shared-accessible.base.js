import "react-native";
import React from "react";
import Button from "../src/button";

export default renderMethod => {
  it("should render an accessible button", () => {
    const wrapper = renderMethod(
      <Button onPress={() => null} title="test button" />
    );

    expect(wrapper).toMatchSnapshot("1. Render an accessible button");
  });
};
