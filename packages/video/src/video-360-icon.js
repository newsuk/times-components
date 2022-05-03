import React from "react";
import { IconVideo360Player } from "@times-components/icons";
import { styleguide } from "@times-components/ts-components";
import { Video360Container } from "./styles";

const { colours } = styleguide();

const video360Icon = () => (
  <Video360Container>
    <IconVideo360Player fillColour={colours.functional.white} height={100} />
  </Video360Container>
);

export default video360Icon;
