/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { Text, Image } from "react-native";
import { colours, spacing } from "@times-components/styleguide";
import Gradient, { OverlayGradient } from "./src/gradient";

const renderExampleText = color => (
  <Text style={{ color }}>Some example text</Text>
);

export default {
  name: "Primitives/Gradient",
  children: [
    {
      type: "story",
      name: "Default",
      component: () => (
        <Gradient
          style={{
            flex: 1,
            height: 250,
            width: "100%"
          }}
        />
      )
    },
    {
      type: "story",
      name: "With Children",
      component: () => (
        <Gradient
          style={{
            flex: 1,
            height: 250,
            width: "100%"
          }}
        >
          {renderExampleText(colours.functional.brandColour)}
        </Gradient>
      )
    },
    {
      type: "story",
      name: "With Dynamic Angles",
      component: ({ number }) => (
        <Gradient
          degrees={number("Gradient Angle: ", 90)}
          style={{
            width: 200,
            height: 200
          }}
        />
      )
    },
    {
      type: "story",
      name: "Overlay gradient",
      component: ({ number }) => (
        <Fragment>
          <OverlayGradient
            degrees={number("Gradient Angle: ", 180)}
            style={{
              flex: 1,
              height: 50,
              position: "absolute",
              top: 0,
              left: 0,
              paddingTop: spacing(2),
              paddingLeft: spacing(1),
              width: 685,
              zIndex: 3
            }}
          >
            {renderExampleText(colours.functional.white)}
          </OverlayGradient>
          <Image
            source={{
              uri:
                "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F7d2fd06c-a460-11e7-8955-1ad2a9a7928d.jpg?crop=1500%2C844%2C0%2C78&resize=685"
            }}
            style={{ width: 685, height: 385 }}
          />
        </Fragment>
      )
    }
  ]
};
