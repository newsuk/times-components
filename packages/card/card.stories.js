import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import Card from "./card";

const cardProps = {
  childRatio: 2.7,
  image: {
    isShowing: true,
    ratio: 1.5,
    size: 360,
    uri:
      "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12"
  }
};

storiesOf("Composed/Card", module)
  .add("Loading", () => <Card {...cardProps} isLoading />)
  .add("Default", () => (
    <Card {...cardProps}>
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
