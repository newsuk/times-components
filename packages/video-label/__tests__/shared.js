import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import VideoLabel from "../src/video-label";

export default () => {
  it("renders VideoLabel with an explicit title", () => {
    const tree = renderer
      .create(<VideoLabel title="swimming" color="#008347" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders VideoLabel without an explicit title", () => {
    const tree = renderer.create(<VideoLabel color="#008347" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
