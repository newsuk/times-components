/* eslint-disable react/prop-types */

import React from "react";
import Button from "./src/button";

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
  name: "Primitives/Button",
  children: [
    {
      type: "story",
      name: "Button",
      component: ({ number, text }, { decorateAction }) => (
        <Button {...getProps(decorateAction, { number, text })} />
      )
    }
  ]
};
