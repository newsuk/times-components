import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import VideoLabel from "../src/video-label";

export default () => {
  it("renders VideoLabel", () => {
    const tree = renderer
      .create(<VideoLabel title="swimming" color="#008347" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("does not render title if title equals Video", () => {
    const tree = renderer
      .create(<VideoLabel title="Video" color="#008347" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
