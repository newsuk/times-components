/* eslint-disable react/prop-types */
import React from "react";
import { colours } from "@times-components/styleguide";
import invert from "lodash.invert";
import VideoLabel from "./src/video-label";

export default {
  name: "Primitives/Video Label",
  children: [
    {
      type: "story",
      name: "Without title",
      component: ({ select }) => (
        <VideoLabel
          color={select(
            "Section",
            invert(colours.section),
            colours.section.default
          )}
        />
      )
    },
    {
      type: "story",
      name: "With title",
      component: ({ select }) => (
        <VideoLabel
          color={select(
            "Section",
            invert(colours.section),
            colours.section.default
          )}
          title="swimming"
        />
      )
    }
  ]
};
