import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import VideoLabel from "../video-label";

module.exports = () => {
  it("renders VideoLabel", () => {
    const tree = renderer
      .create(<VideoLabel title="swimming" color="#008347" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
