import React from "react";
import { storiesOf } from "@storybook/react-native";
import Card from "./card";

storiesOf("Card", module)
  .add("text and image", () =>
    <Card
      title="Some sort of property"
      uri="https://lid.zoocdn.com/645/430/14b6a430b76a235e8de2ba02d695e7a0bd789b40.jpg"
    />
  )
  .add("text and image 2", () =>
    <Card
      title="Some sort of property!!!!"
      uri="https://lid.zoocdn.com/645/430/14b6a430b76a235e8de2ba02d695e7a0bd789b40.jpg"
    />
  );
