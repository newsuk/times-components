import { View } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import Card from "./card";

const props = {
  label: "Camilla Long",
  headline: "OK, so Putin’s not a lady, but he does have the wildest man‑PMT",
  date: "Sunday June 11 2017",
  publication: "The Sunday Times",
  text:
    "When I was the official celebrity sex correspondent on Style magazine, every so often I would have to address the abject failure of male...  ",
  image: {
    uri:
      "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12&resize=320"
  }
};

storiesOf("Card", module).add("Card", () =>
  <View style={{ width: "100%" }}>
    <Card {...props} />
  </View>
);
