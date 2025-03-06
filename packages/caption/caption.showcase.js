import React from "react";
import Caption, { CentredCaption } from "./src/caption";

const captionText =
  'The prime minister said HMS Queen Elizabeth was a symbol of Britain’s status as a "great maritime nation"';
const credits = "BEN STANSALL/PA WIRE";
const exampleImage =
  "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Ff10d34c8-abaf-11e8-9969-06853d7144fd.jpg?crop=1688%2C949%2C0%2C88&resize=685";
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
      component: () => <CentredCaption credits={credits} text={captionText} />,
      name: "Centred caption",
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
