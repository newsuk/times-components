import { View } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import Markup from "./markup";

const multiParagraph = require("./fixtures/multi-paragraph.json").fixture;
const mixture = require("./fixtures/tag-mixture.json").fixture;
const bio = require("./fixtures/bio.json").fixture;

const story = m => <View style={{ padding: 20 }}>{m}</View>;

storiesOf("Markup", module)
  .add("Multiple paragraphs", () => story(<Markup ast={multiParagraph} />))
  .add("Mixture of tags", () => story(<Markup ast={mixture} />))
  .add("Biography", () => story(<Markup ast={bio} wrapIn="p" />));
