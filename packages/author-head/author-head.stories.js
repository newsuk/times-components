import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import AuthorHead from "./author-head";

const data = require("./fixtures/profile.json");

const story = m =>
  <View style={{ padding: 20 }}>
    {m}
  </View>;

storiesOf("AuthorHead", module).add("Full Header", () =>
  story(<AuthorHead onLinkPress={action("onLinkPress")} {...data} />)
);
