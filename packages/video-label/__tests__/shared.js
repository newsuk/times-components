import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import VideoLabel from "../video-label";

<<<<<<< HEAD
export default () => {
=======
module.exports = () => {
>>>>>>> feat: implements video-label
  it("renders VideoLabel", () => {
    const tree = renderer
      .create(<VideoLabel title="swimming" color="#008347" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
