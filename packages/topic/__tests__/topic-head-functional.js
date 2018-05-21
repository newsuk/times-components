import React from "react";
import renderer from "react-test-renderer";
import TopicHead from "../src/topic-head";

export default () => {
  it("should render correctly", () => {
    const tree = renderer
      .create(<TopicHead isLoading={false} name="Animals" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render correctly with a description", () => {
    const tree = renderer
      .create(
        <TopicHead
          isLoading={false}
          name="Animals"
          description="Animals are multicellular eukaryotic organisms."
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render correctly when loading", () => {
    const tree = renderer.create(<TopicHead name="Animals" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
