import "react-native";
import React from "react";
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

export default {
  name: "Primitives/Caption",
  children: [
    {
      type: "story",
      name: "Without credits",
      component: () => <Caption text={captionText} />
    },
    {
      type: "story",
      name: "With credits",
      component: () => <Caption text={captionText} credits={credits} />
    },
    {
      type: "story",
      name: "Credits only",
      component: () => <Caption credits={credits} />
    },
    {
      type: "story",
      name: "With specific styles",
      component: () => (
        <Caption text={captionText} credits={credits} style={style} />
      )
    },
    {
      type: "story",
      name: "Image with caption",
      component: () => (
        <Caption text={captionText} credits={credits}>
          <Image uri={exampleImage} aspectRatio={16 / 9} />
        </Caption>
      )
    }
  ]
};
