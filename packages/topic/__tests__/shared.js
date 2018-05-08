import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Topic from "../src/topic";

module.exports = () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Topic name="animals" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with a description", () => {
    const tree = renderer
      .create(
        <Topic
          name="animals"
          description="Animals are multicellular eukaryotic organisms."
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
