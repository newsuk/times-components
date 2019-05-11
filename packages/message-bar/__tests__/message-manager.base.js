import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import TestRenderer from "react-test-renderer";
import { scales } from "@times-components/styleguide";
import { delay } from "@times-components/test-utils";
import MessageManager from "../src/message-manager";
import MessageBar from "../src/message-bar";
import Context from "../src/message-context";

const TestConsumer = () => (
  <Context.Consumer>
    {({ showMessage }) => (
      <TouchableOpacity onPress={() => showMessage("foo")} />
    )}
  </Context.Consumer>
);

export default animate => [
  {
    name: "renders correctly",
    test: async () => {
      const testInstance = TestRenderer.create(
        <MessageManager animate={animate} delay={1} scale={scales.medium}>
          <View>
            <Text>test child content</Text>
          </View>
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
        <MessageManager animate={animate} delay={1} scale={scales.medium}>
          <TestConsumer />
        </MessageManager>
      );

      const touchable = testInstance.root.findByType(TouchableOpacity);

      touchable.props.onPress();

      expect(testInstance.root.instance.state.message).toEqual("foo");
    }
  },
  {
    name: "removes the message when the bar says it closed",
    test: async () => {
      const testInstance = TestRenderer.create(
        <MessageManager animate={animate} delay={100} scale={scales.medium}>
          <TestConsumer />
        </MessageManager>
      );

      const touchable = testInstance.root.findByType(TouchableOpacity);
      touchable.props.onPress();

      delay(1);

      const close = testInstance.root
        .findByType(MessageBar)
        .findByType(TouchableOpacity);
      close.props.onPress();

      expect(testInstance.root.instance.state.message).toEqual(null);
    }
  }
];
