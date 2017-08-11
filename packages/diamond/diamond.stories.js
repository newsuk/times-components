import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import Diamond from "./diamond";

storiesOf("Diamond", module).add("Diamond", () =>
  <Diamond height={7} width={7} color={"green"} />
);
