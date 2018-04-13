import { storiesOf } from "@storybook/react-native";
import * as actions from "@storybook/addon-actions";
import * as decorators from "./decorators";
import showcaseToStoryBook from "./showcase-to-storybook";
import knobs from "./knobs";
import select from "./select-shim";

const {
  CenteredDecorator,
  BarSpacingDecorator,
  LateralSpacingDecorator,
  WhiteBgColorDecorator
} = decorators;

const showcaseConverter = showcaseToStoryBook(storiesOf, knobs, actions);

export {
  CenteredDecorator,
  BarSpacingDecorator,
  LateralSpacingDecorator,
  WhiteBgColorDecorator,
  select,
  showcaseConverter
};
