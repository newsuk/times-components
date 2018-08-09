/* eslint-disable react/prop-types */
import React from "react";
import { Text } from "react-native";
import Gradient from "./src/gradient";

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
          <Text>Some example text.</Text>
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
    }
  ]
};
