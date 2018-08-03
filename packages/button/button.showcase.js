/* eslint-disable react/prop-types */
import React from "react";
import invert from "lodash.invert";
import { colours } from "@times-components/styleguide";
import Button from "./src/button";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const getProps = (decorateAction, knobs) => {
  const { number, select, text } = knobs;
  return {
    onPress: preventDefaultedAction(decorateAction)("onPress"),
    style: {
      button: {
        backgroundColor: select(
          "Button Colour: ",
          invert(colours.functional),
          colours.functional.action
        ),
        width: number("Button width: ", 200)
      },
      text: {
        color: select(
          "Button Text Colour: ",
          invert(colours.functional),
          colours.functional.contrast
        )
      }
    },
    title: text("Button title:", "submit")
  };
};

export default {
  name: "Primitives/Button",
  children: [
    {
      type: "story",
      name: "Button",
      component: ({ number, select, text }, { decorateAction }) => (
        <Button {...getProps(decorateAction, { number, select, text })} />
      )
    }
  ]
};
