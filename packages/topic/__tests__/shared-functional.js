import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Topic from "../src/topic";

jest.mock("../src/topic-head-loading", () => "TopicHeadLoading");
jest.mock("../src/divider", () => "Divider");

export default () => {
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
};
