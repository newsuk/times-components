import React from "react";
import Button from "../src/button";

jest.mock("@times-components/styleguide", () => () => ({
  ...jest.requireActual("@times-components/styleguide"),
  fontFactory: jest.fn(() => ({
    fontFamily: "GillSansMTStd-Medium",
    fontSize: 16
  })),
  colours: {
    functional: {
      action: "#006699",
      white: "#FFFFFF"
    }
  }
})); 

export default renderMethod => {
  it("accessible button", () => {
    const output = renderMethod(
      <Button onPress={() => null} title="test button" />
    );
    expect(output).toMatchSnapshot();
  });
};
