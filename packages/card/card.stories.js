import React from "react";
import { Text, View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { boolean } from "@storybook/addon-knobs/react";
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

storiesOf("Composed/Card", module)
  .add("Loading", () => (
    <Card {...cardProps} showImage={boolean("Show Image?", true, '')} isLoading>
      <Text>Is loading</Text>
    </Card>
  ))
  .add("Default", () => (
    <Card {...cardProps} showImage={boolean("Show Image?", true, '')}>
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
