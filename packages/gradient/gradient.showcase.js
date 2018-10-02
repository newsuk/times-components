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
                "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2Fb45ad130-5456-11e8-a94b-41e5a20c31cf.jpg?crop=2250%2C1266%2C0%2C117&resize=685"
            }}
            style={{ width: 685, height: 385 }}
          />
        </Fragment>
      )
    }
  ]
};
