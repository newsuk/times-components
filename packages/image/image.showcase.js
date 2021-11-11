/* eslint-disable react/no-danger */
import React from "react";
import Image from "./src/image";

const squareUri =
  "https://feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=400";
const sixteenNineUri =
  "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F7d2fd06c-a460-11e7-8955-1ad2a9a7928d.jpg?crop=1500%2C844%2C0%2C78&resize=685";

const SquareImage = props => (
  <Image aspectRatio={1} uri={squareUri} {...props} />
);
const SixteenNineImage = props => (
  <Image aspectRatio={16 / 9} uri={sixteenNineUri} {...props} />
);

export default {
  children: [
    {
      component: () => <SquareImage />,
      name: "Fills parent width",
      type: "story"
    },
    {
      component: () => <SquareImage rounded />,
      name: "Rounded images",
      type: "story"
    },
    {
      component: () => (
        <div>
          <div style={{ width: 300 }}>
            <SixteenNineImage />
          </div>
          <div style={{ width: 200 }}>
            <SixteenNineImage />
          </div>
          <div style={{ width: 100 }}>
            <SixteenNineImage />
          </div>
        </div>
      ),
      name: "Maintains aspect ratio",
      type: "story"
    },
    {
      component: () => (
        <div>
          <div style={{ width: 300 }}>
            <Image aspectRatio={16 / 9} uri="http://httpstat.us/404" />
          </div>
          <div style={{ width: 200 }}>
            <Image aspectRatio={16 / 9} uri="http://httpstat.us/404" />
          </div>
          <div style={{ width: 100 }}>
            <Image aspectRatio={16 / 9} uri="http://httpstat.us/404" />
          </div>
        </div>
      ),
      name: "Maintains aspect ratio with placeholders",
      type: "story"
    },
    {
      component: () => (
        <div>
          <div style={{ width: 300 }}>
            <Image aspectRatio={16 / 9} uri={null} />
          </div>
        </div>
      ),
      name: "Falls back to display the placeholder",
      type: "story"
    },
    {
      component: () => <SquareImage disablePlaceholder />,
      name: "With disabled placeholder",
      type: "story"
    },
    {
      component: () => (
        <div>
          <SquareImage
            style={{
              borderRadius: 100,
              height: 200,
              overflow: "hidden",
              width: 200
            }}
          />
          <SquareImage
            style={{
              borderRadius: 50,
              height: 100,
              overflow: "hidden",
              width: 100
            }}
          />
          <SquareImage
            style={{
              borderRadius: 25,
              height: 50,
              overflow: "hidden",
              width: 50
            }}
          />
        </div>
      ),
      name: "Can be styled and keep aspect ratio",
      type: "story"
    },
    {
      component: () => (
        <div>
          <div
            style={{
              borderColor: "black",
              borderWidth: 1,
              width: 200
            }}
          >
            <Image aspectRatio={1 / 1} uri={sixteenNineUri} />
          </div>
          <div
            style={{
              borderColor: "black",
              borderWidth: 1,
              width: 200
            }}
          >
            <Image aspectRatio={16 / 9} uri={squareUri} />
          </div>
        </div>
      ),
      name:
        "Handles incorrect aspect ratios inconsistently (web native mismatch)",
      type: "story"
    },
    {
      component: () => (
        <div style={{ width: 300 }}>
          <Image
            aspectRatio={1 / 1}
            uri="//feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=400"
          />
        </div>
      ),
      name: "Defaults schema to https",
      type: "story"
    }
  ],
  name: "Primitives/Image"
};
