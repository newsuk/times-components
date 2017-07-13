import { View } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import Card from "./card";
import props from "./fixtures/card-props.json";

const story = m => <View style={{ padding: 20 }}>{m}</View>;

storiesOf("Card", module).add("Card", () => story(<Card {...props} />));
