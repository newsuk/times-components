import * as builtInKnobs from "@storybook/addon-knobs/react";
import { selectV2, text } from "@storybook/addon-knobs";
import select from "./select-shim";

const knobs = {
  ...builtInKnobs,
  select,
  text,
  selectV2
};

export default knobs;
