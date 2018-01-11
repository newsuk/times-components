import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { IconTwitter } from "./icons";

storiesOf("Icons", module).add("Icons", () => (
  <IconTwitter width={50} height={50} />
));
