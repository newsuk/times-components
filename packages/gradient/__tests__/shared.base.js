import React from "react";
import { Text } from "react-native";
import Gradient from "../src/gradient";

export default renderMethod => {
  it("renders", () => {
    const output = renderMethod(<Gradient />);

    expect(output).toMatchSnapshot("1. renders");
  });

  it("renders with a child", () => {
    const output = renderMethod(
      <Gradient>
        <Text>Hello world!</Text>
      </Gradient>
    );

    expect(output).toMatchSnapshot("2. renders with a child");
  });
};
