import "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "../../storybook/storiesOfOverloader";
import Watermark from "./watermark";

storiesOf("Watermark", module)
  .add("MPU", () => <Watermark width={300} height={250} />)
  .add("Full", () => (
    <Watermark width={970} height={250} viewBox="0 0 1000 300" />
  ));
