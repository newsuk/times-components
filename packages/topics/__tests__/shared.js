import "react-native";
import React from "react";
import { shallow } from "enzyme";
import Topics from "../topics";
import Topic from "../topic";
import topicData from "../fixtures/topics";

module.exports = () => {
  it("renders a group of Topics in the correct order", () => {
    const wrapper = shallow(<Topics topics={topicData} />);

    expect(wrapper).toMatchSnapshot(
      "1. Render a group of topics in the correct order"
    );
  });

  it("renders a single Topic", () => {
    const wrapper = shallow(
      <Topic id={topicData[0].id} name={topicData[0].name} />
    );

    expect(wrapper).toMatchSnapshot("2. Render a single Topic");
  });
};
