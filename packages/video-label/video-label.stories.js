import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { select } from "@storybook/addon-knobs/react";
import invert from "lodash.invert";
import { colours } from "@times-components/styleguide";
import VideoLabel from "./video-label";

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
<<<<<<< HEAD
      title="swimming"
=======
      title="SWIMMING"
>>>>>>> feat: implements video-label
      color={select(
        "Section",
        invert(colours.section),
        colours.section.default
      )}
    />
  ));
