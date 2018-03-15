import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Topics from "../topics";
import Topic from "../topic";
import topicData from "../fixtures/topics";

module.exports = () => {
  it("renders a group of Topics in the correct order", () => {
    const tree = renderer.create(<Topics topics={topicData} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders a single Topic", () => {
    const tree = renderer
      .create(<Topic id={topicData[0].id} name={topicData[0].name} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
