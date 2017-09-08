import { View } from "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import Card from "./card";
import props from "./fixtures/card-props.json";

const story = m => <View style={{ padding: 20 }}>{m}</View>;

props.date = new Date("2017-07-01T14:32:00.000Z");
storiesOf("Card", module)
  .add("Card", () => story(<Card {...props} />))
  .add("Card without Image", () =>
    story(
      <Card
        {...Object.assign({}, props, {
          image: {
            url: null
          }
        })}
      />
    )
  );
