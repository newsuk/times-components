/* eslint-disable react/no-danger */
import React from "react";
import { TcView } from "@times-components/utils";
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
        <TcView>
          <TcView style={{ width: "300px" }}>
            <SixteenNineImage />
          </TcView>
          <TcView style={{ width: "200px" }}>
            <SixteenNineImage />
          </TcView>
          <TcView style={{ width: "100px" }}>
            <SixteenNineImage />
          </TcView>
        </TcView>
      ),
      name: "Maintains aspect ratio",
      type: "story"
    },
    {
      component: () => (
        <TcView>
          <TcView style={{ width: "300px" }}>
            <Image aspectRatio={16 / 9} uri="http://httpstat.us/404" />
          </TcView>
          <TcView style={{ width: "200px" }}>
            <Image aspectRatio={16 / 9} uri="http://httpstat.us/404" />
          </TcView>
          <TcView style={{ width: "100px" }}>
            <Image aspectRatio={16 / 9} uri="http://httpstat.us/404" />
          </TcView>
        </TcView>
      ),
      name: "Maintains aspect ratio with placeholders",
      type: "story"
    },
    {
      component: () => (
        <TcView>
          <TcView style={{ width: "300px" }}>
            <Image aspectRatio={16 / 9} uri={null} />
          </TcView>
        </TcView>
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
        <TcView>
          <SquareImage
            style={{
              borderRadius: "100px",
              height: "200px",
              overflow: "hidden",
              width: "200px"
            }}
          />
          <SquareImage
            style={{
              borderRadius: "50px",
              height: "100px",
              overflow: "hidden",
              width: "100px"
            }}
          />
          <SquareImage
            style={{
              borderRadius: "25px",
              height: "50px",
              overflow: "hidden",
              width: "50px"
            }}
          />
        </TcView>
      ),
      name: "Can be styled and keep aspect ratio",
      type: "story"
    },
    {
      component: () => (
        <TcView>
          <TcView
            style={{
              borderColor: "black",
              borderWidth: "1px",
              width: "200px"
            }}
          >
            <Image aspectRatio={1 / 1} uri={sixteenNineUri} />
          </TcView>
          <TcView
            style={{
              borderColor: "black",
              borderWidth: "1px",
              width: "200px"
            }}
          >
            <Image aspectRatio={16 / 9} uri={squareUri} />
          </TcView>
        </TcView>
      ),
      name: "Handles incorrect aspect ratios inconsistently",
      type: "story"
    },
    {
      component: () => (
        <TcView style={{ width: "300px" }}>
          <Image
            aspectRatio={1 / 1}
            uri="//feeds.thetimes.co.uk/web/imageserver/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0694e84e-04ff-11e7-976a-0b4b9a1a67a3.jpg?crop=854,854,214,0&resize=400"
          />
        </TcView>
      ),
      name: "Defaults schema to https",
      type: "story"
    }
  ],
  name: "Primitives/Image"
};
