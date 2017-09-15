import "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import ResponsiveStyleHOC from "./responsive-hoc";

storiesOf("ResponsiveStyleHOC", module).add("ResponsiveStyleHOC", () =>
  <ResponsiveStyleHOC />
);
