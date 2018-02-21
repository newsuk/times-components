import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { checkA11y } from "@storybook/addon-a11y";
import Watermark from "./watermark";

storiesOf("Primitives/Watermark", module)
  .addDecorator(checkA11y)
  .add("MPU", () => <Watermark width={300} height={250} />)
  .add("Full", () => (
    <Watermark width={970} height={250} viewBox="0 0 1000 300" />
  ));
