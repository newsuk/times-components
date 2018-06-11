import "jest-styled-components";
import React from "react";
import renderer from "react-test-renderer";
import TopicHead from "../src/topic-head";

export default () => {
  it("should render styling correctly", () => {
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
};
