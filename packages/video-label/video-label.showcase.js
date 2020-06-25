/* eslint-disable react/prop-types */
import React from "react";
import { colours } from "@times-components-native/styleguide";
import pick from "lodash.pick";
import { sections } from "@times-components-native/storybook";
import VideoLabel from "./src/video-label";

export default {
  children: [
    {
      component: ({ select }) => (
        <VideoLabel
          color={select(
            "Section",
            pick(colours.section, sections),
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
            pick(colours.section, sections),
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
