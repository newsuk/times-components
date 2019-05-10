import React from "react";
import { TouchableOpacity } from "react-native";
import { scales } from "@times-components/styleguide";
import { delay } from "@times-components/test-utils";
import { shallow } from "enzyme";
import TestRenderer from "react-test-renderer";
import MessageBar from "../src/message-bar";

export default animate => [
  {
    name: "renders correctly",
    test: async () => {
      const testInstance = TestRenderer.create(
        <MessageBar
          animate={animate}
          close={() => {}}
          delay={1}
          message="test message"
          scale={scales.medium}
        />
      );

      await delay(500);

      expect(testInstance.toJSON()).toMatchSnapshot();
    }
  },
  {
    name: "closes when clicking the close button",
    test: async () => {
      const closed = jest.fn();
      const testInstance = shallow(
        <MessageBar
          animate={animate}
          close={closed}
          delay={1}
          message="test message"
          scale={scales.medium}
        />
      );

      const button = testInstance.find(TouchableOpacity);
      button.simulate("press");

      expect(closed).toBeCalled();
    }
  },
  {
    name: "extends the timeout when updated with the same message",
    test: async () => {
      const testInstance = shallow(
        <MessageBar
          animate={animate}
          close={() => {}}
          delay={100}
          message="test message"
          scale={scales.medium}
        />
      );

      const prevTimeout = testInstance.state("timeout");
      testInstance.setProps({
        message: "test message"
      });

      const newTimeout = testInstance.state("timeout");

      expect(prevTimeout).not.toEqual(newTimeout);
    }
  },
  {
    name: "doesn't extend the timeout if its a new message",
    test: async () => {
      const testInstance = shallow(
        <MessageBar
          animate={animate}
          close={() => {}}
          delay={100}
          message="test message"
          scale={scales.medium}
        />
      );

      const prevTimeout = testInstance.state("timeout");
      testInstance.setProps({
        message: "new test message"
      });

      const newTimeout = testInstance.state("timeout");

      expect(prevTimeout).toEqual(newTimeout);
    }
  }
];
