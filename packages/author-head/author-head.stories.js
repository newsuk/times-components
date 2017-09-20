import React from "react";
import { View } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { decorateAction } from "@storybook/addon-actions";
import AuthorHead from "./author-head";

const data = require("./fixtures/profile.json");

const story = m => <View style={{ padding: 20 }}>{m}</View>;

const preventDefaultedAction = decorateAction([
  ([e, ...args]) => {
    e.preventDefault();
    return ["[SyntheticEvent (storybook prevented default)]", ...args];
  }
]);

const extras = {
  onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress")
};

storiesOf("AuthorHead", module).add("Full Header", () =>
  story(<AuthorHead {...data} {...extras} />)
);
