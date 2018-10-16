import React from "react";
import { Image } from "react-native";
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
  children: [
    {
      component: () => <Caption text={captionText} />,
      name: "Without credits",
      type: "story"
    },
    {
      component: () => <Caption credits={credits} text={captionText} />,
      name: "With credits",
      type: "story"
    },
    {
      component: () => <Caption credits={credits} />,
      name: "Credits only",
      type: "story"
    },
    {
      component: () => (
        <Caption credits={credits} style={style} text={captionText} />
      ),
      name: "With specific styles",
      type: "story"
    },
    {
      component: () => (
        <Caption credits={credits} text={captionText}>
          <Image aspectRatio={16 / 9} uri={exampleImage} />
        </Caption>
      ),
      name: "Image with caption",
      platform: "native",
      type: "story"
    },
    {
      component: () => (
        <Caption credits={credits} text={captionText}>
          <div
            style={{
              paddingBottom: `${100 / 16 / 9}%`
            }}
          >
            <img alt="Man with beard" src={exampleImage} />
          </div>
        </Caption>
      ),
      name: "Image with caption",
      platform: "web",
      type: "story"
    }
  ],
  name: "Primitives/Caption"
};
