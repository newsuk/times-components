import "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import Image from "@times-components/image";
import Caption from "./caption";

const captionText = "This is caption text";
const credits = "And these are just credits";
const exampleImage = {
  uri:
    "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12&resize=320"
};
const style = {
  container: {
    backgroundColor: "blue"
  },
  text: {
    color: "white"
  }
};

storiesOf("Caption", module)
  .add("Without credits", () => <Caption text={captionText} />)
  .add("With credits", () => <Caption text={captionText} credits={credits} />)
  .add("Credits only", () => <Caption credits={credits} />)
  .add("With specific styles", () => (
    <Caption text={captionText} credits={credits} style={style} />
  ))
  .add("Image with caption", () => (
    <Caption text={captionText} credits={credits}>
      <Image source={exampleImage} />
    </Caption>
  ));
