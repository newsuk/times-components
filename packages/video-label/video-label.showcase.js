/* eslint-disable react/prop-types */
import React from "react";
import { colours } from "@times-components/styleguide";
import invert from "lodash.invert";
import VideoLabel from "./src/video-label";

export default {
  children: [
    {
      component: ({ select }) => (
        <VideoLabel
          color={select(
            "Section",
            invert(colours.section),
            colours.section.default
          )}
        />
      ),
      name: "Without title",
      type: "story"
    },
    {
      component: ({ select }) => (
        <VideoLabel
          color={select(
            "Section",
            invert(colours.section),
            colours.section.default
          )}
          title="swimming"
        />
      ),
      name: "With title",
      type: "story"
    }
  ],
  name: "Primitives/Video Label"
};
