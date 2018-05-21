import * as builtInKnobs from "@storybook/addon-knobs/react";
import { selectV2 } from "@storybook/addon-knobs";
import select from "./select-shim";

const knobs = {
  ...builtInKnobs,
  select,
  selectV2
};

export default knobs;
