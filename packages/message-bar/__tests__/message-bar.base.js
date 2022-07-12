import React from "react";
import { scales } from "@times-components/ts-styleguide";
import { delay } from "@times-components/test-utils";
import { shallow } from "enzyme";
import TestRenderer from "react-test-renderer";
import MessageBar from "../src/message-bar";
import { CloseButton } from "../src/styles";

export default () => [
  {
    name: "renders correctly",
    test: async () => {
      const testInstance = TestRenderer.create(
        <MessageBar
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
          close={closed}
          delay={10000}
          message="test message"
          scale={scales.medium}
        />
      );
      const button = testInstance.find(CloseButton);
      button.simulate("click");
      await delay(300);
      expect(closed.mock.calls.length).toEqual(1);
    }
  },
  {
    name: "extends the timeout when updated with the same message",
    test: async () => {
      const testInstance = shallow(
        <MessageBar
          close={() => {}}
          delay={100}
          message="test message"
          scale={scales.medium}
        />
      );

      const prevTimeout = testInstance.instance().timeout;

      testInstance.setProps({
        message: "test message"
      });

      const newTimeout = testInstance.instance().timeout;

      expect(prevTimeout).not.toEqual(newTimeout);
    }
  },
  {
    name: "doesn't extend the timeout if its a new message",
    test: async () => {
      const testInstance = shallow(
        <MessageBar
          close={() => {}}
          delay={100}
          message="test message"
          scale={scales.medium}
        />
      );

      const prevTimeout = testInstance.instance().timeout;
      testInstance.setProps({
        message: "new test message"
      });

      const newTimeout = testInstance.instance().timeout;
      expect(prevTimeout).toEqual(newTimeout);
    }
  }
];
