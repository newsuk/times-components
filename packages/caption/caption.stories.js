import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import Image from "@times-components/image";
import Caption from "./src/caption";

const captionText =
  'The prime minister said HMS Queen Elizabeth was a symbol of Britain’s status as a "great maritime nation"';
const credits = "BEN STANSALL/PA WIRE";
const exampleImage =
  "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F7d2fd06c-a460-11e7-8955-1ad2a9a7928d.jpg?crop=1500%2C844%2C0%2C78&resize=685";
const style = {
  container: {
    backgroundColor: "blue"
  },
  text: {
    color: "white"
  }
};

storiesOf("Primitives/Caption", module)
  .add("Without credits", () => <Caption text={captionText} />)
  .add("With credits", () => <Caption text={captionText} credits={credits} />)
  .add("Credits only", () => <Caption credits={credits} />)
  .add("With specific styles", () => (
    <Caption text={captionText} credits={credits} style={style} />
  ))
  .add("Image with caption", () => (
    <Caption text={captionText} credits={credits}>
      <Image uri={exampleImage} aspectRatio={16 / 9} />
    </Caption>
  ));
