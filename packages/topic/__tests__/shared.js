import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Topic from "../src/topic";
import {
  HeadContainer,
  ResponsiveName,
  ResponsiveDivider
} from "../src/styles/responsive.web";

module.exports = () => {
  it("should render correctly", () => {
    const tree = renderer.create(<Topic name="Animals" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render correctly with a description", () => {
    const tree = renderer
      .create(
        <Topic
          name="Animals"
          description="Animals are multicellular eukaryotic organisms."
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render correctly when loading", () => {
    const tree = renderer.create(<Topic name="Animals" isLoading />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render HeadContainer correctly", () => {
    expect(renderer.create(<HeadContainer />).toJSON()).toMatchSnapshot();
  });

  it("should render ResponsiveName correctly", () => {
    expect(renderer.create(<ResponsiveName />).toJSON()).toMatchSnapshot();
  });

  it("should render ResponsiveDivider correctly", () => {
    expect(renderer.create(<ResponsiveDivider />).toJSON()).toMatchSnapshot();
  });
};
