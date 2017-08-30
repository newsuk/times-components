import "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import BrightcoveVideoLauncher from "./brightcove-video-launcher";

storiesOf("BrightcoveVideoLauncher", module).add("BrightcoveVideoLauncher", () =>
  <BrightcoveVideoLauncher />
);
