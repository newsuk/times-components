import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { select } from "@storybook/addon-knobs/react";
import invert from "lodash.invert";
import { colours } from "@times-components/styleguide";
import VideoLabel from "./src/video-label";

storiesOf("Primitives/VideoLabel", module)
  .add("VideoLabel without title", () => (
    <VideoLabel
      color={select(
        "Section",
        invert(colours.section),
        colours.section.default
      )}
    />
  ))
  .add("VideoLabel with title", () => (
    <VideoLabel
      title="swimming"
      color={select(
        "Section",
        invert(colours.section),
        colours.section.default
      )}
    />
  ));
