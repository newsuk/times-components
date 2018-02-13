import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import Watermark from "./watermark";

storiesOf("Watermark", module)
  .add("MPU", () => <Watermark width={300} height={250} />)
  .add("Full", () => (
    <Watermark width={970} height={250} viewBox="0 0 1000 300" />
  ));
