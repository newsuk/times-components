/* eslint-disable react/prop-types */

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
    style: { width: number("Button width: ", 200) },
    title: text("Button title:", "submit")
  };
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
