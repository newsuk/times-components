import { storiesOf } from "@storybook/react-native";
import * as knobs from "@storybook/addon-knobs/react";
import * as actions from "@storybook/addon-actions";
import * as decorators from "./decorators";
import showcaseToStoryBook from "./showcase-to-storybook";

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
  showcaseConverter
};
