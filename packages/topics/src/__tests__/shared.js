import "react-native";
import React from "react";
import mockDate from "mockdate";
import { shallow } from "enzyme";
import Topics from "../topics";
import Topic from "../topic";
import topicData from "../../fixtures/topics";

module.exports = () => {
  beforeEach(() => {
    mockDate.set("1/1/2018");
  });

  afterEach(() => {
    mockDate.reset();
  });

  it("renders a group of Topics in the correct order", () => {
    const wrapper = shallow(<Topics topics={topicData} />);

    expect(wrapper).toMatchSnapshot(
      "1. Render a group of topics in the correct order"
    );
  });

  it("renders a single Topic", () => {
    const wrapper = shallow(
      <Topic id={topicData[0].id} name={topicData[0].name} />
    ).dive();

    expect(wrapper).toMatchSnapshot("2. Render a single Topic");
  });

  it("onPress handler is working", done => {
    const onPress = (e, { id, name }) => {
      expect(e).toBe("event");
      expect(id).toBe(id);
      expect(name).toBe(name);
      done();
    };

    shallow(
      <Topic
        id={topicData[0].id}
        name={topicData[0].name}
        onPress={(e, data) => onPress(e, data)}
      />
    )
      .dive()
      .simulate("press", "event");
  });

  it("onPress sends analytics", () => {
    const events = jest.fn();

    const context = {
      tracking: {
        analytics: events
      }
    };

    shallow(<Topic id={topicData[0].id} name={topicData[0].name} />, {
      context
    }).simulate("press", "events");

    expect(events.mock.calls).toMatchSnapshot();
  });
};
