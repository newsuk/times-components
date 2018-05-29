import "react-native";
import React from "react";
import ButtonPrimary from "./src/button-primary";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const getProps = (decorateAction, knobs) => {
  const { number, text } = knobs;
  return {
    onPress: preventDefaultedAction(decorateAction)("onPress"),
    title: text("Button title:", "submit"),
    width: number("Button width in pixels:", 165)
  }
};

export default {
  name: "Primitives/ButtonPrimary",
  children: [
    {
      type: "story",
      name: "ButtonPrimary",
      component: ({ number, text }, { decorateAction }) => (
      	<ButtonPrimary {...getProps(decorateAction, { number, text })} />
      )
    }
  ]
};
