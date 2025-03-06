import React from "react";
import { TcView, TcText } from "@times-components/utils";
import TestRenderer from "react-test-renderer";
import { scales } from "@times-components/ts-styleguide";
import { delay } from "@times-components/test-utils";
import MessageManager from "../src/message-manager";
import MessageBar from "../src/message-bar";
import { CloseButton } from "../src/styles";
import Context from "../src/message-context";

const Button = () => <button type="button" />;

const TestConsumer = () => (
  <Context.Consumer>
    {({ showMessage }) => <Button onClick={() => showMessage("foo")} />}
  </Context.Consumer>
);

export default () => [
  {
    name: "renders correctly",
    test: async () => {
      const testInstance = TestRenderer.create(
        <MessageManager delay={1} scale={scales.medium}>
          <TcView>
            <TcText>test child content</TcText>
          </TcView>
        </MessageManager>
      );

      await delay(500);

      expect(testInstance.toJSON()).toMatchSnapshot();
    }
  },
  {
    name: "children can show a message",
    test: async () => {
      const testInstance = TestRenderer.create(
        <MessageManager delay={1} scale={scales.medium}>
          <TestConsumer />
        </MessageManager>
      );

      const button = testInstance.root.findByType(Button);

      button.props.onClick();

      expect(testInstance.root.instance.state.message).toEqual("foo");
    }
  },
  {
    name: "removes the message when the bar says it closed",
    test: async () => {
      const testInstance = TestRenderer.create(
        <MessageManager delay={1000} scale={scales.medium}>
          <TestConsumer />
        </MessageManager>
      );

      const button = testInstance.root.findByType(Button);
      button.props.onClick();

      delay(1);

      const close = testInstance.root
        .findByType(MessageBar)
        .findByType(CloseButton);

      close.props.onClick();

      await delay(300);
      expect(testInstance.root.instance.state.message).toEqual(null);
    }
  }
];
