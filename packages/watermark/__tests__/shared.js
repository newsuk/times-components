import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Watermark from "../src/watermark";

module.exports = () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Watermark height={250} width={300} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
