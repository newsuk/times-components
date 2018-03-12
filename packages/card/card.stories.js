import React from "react";
import { Text, View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { boolean, number } from "@storybook/addon-knobs/react";
import Card from "./card";

const cardProps = {
  childRatio: 2.7,
  image: {
    uri:
      "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12"
  },
  imageRatio: 1.5,
  imageSize: 360
};

const label = "Width of Card content";
const defaultValue = 2.7;
const options = {
  range: true,
  min: 1,
  max: 5,
  step: 0.1
};

storiesOf("Composed/Card", module)
  .add("Loading", () => (
    <Card
      {...cardProps}
      showImage={boolean("Show Image?", true, "")}
      tabletChildRatio={number(label, defaultValue, options)}
      isLoading
    >
      <Text>Is loading</Text>
    </Card>
  ))
  .add("Default", () => (
    <Card
      {...cardProps}
      showImage={boolean("Show Image?", true, "")}
      tabletChildRatio={number(label, defaultValue, options)}
    >
      <View
        style={{
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: 1,
          minHeight: 200
        }}
      />
    </Card>
  ));
