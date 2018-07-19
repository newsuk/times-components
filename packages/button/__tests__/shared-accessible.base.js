import React from "react";
import Button from "../src/button";

export default renderMethod => {
  it("accessible button", () => {
    const wrapper = renderMethod(
      <Button onPress={() => null} title="test button" />
    );

    expect(wrapper).toMatchSnapshot();
  });
};
