import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import Puff from "./puff";
import puffProps from "./fixtures/puff-props";

storiesOf("Puff", module)
  .add("Puff with full content", () => <Puff {...puffProps} />)
  .add("Puff without a section", () => (
    <Puff {...puffProps} sectionName={null} />
  ))
  .add("Puff without a label", () => <Puff {...puffProps} label={null} />)
  .add("Puff without custom link text", () => (
    <Puff {...puffProps} linkText={undefined} />
  ))
  .add("Puff without an image", () => <Puff {...puffProps} image={null} />);
