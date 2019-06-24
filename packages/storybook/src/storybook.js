import { storiesOf } from "@storybook/react-native";
import * as actions from "@storybook/addon-actions";
import * as builtInKnobs from "@storybook/addon-knobs/react";
import * as decorators from "./decorators";
import showcaseToStoryBook from "./showcase-to-storybook";
import sections from "./sections";

const {
  CenteredDecorator,
  BarSpacingDecorator,
  LateralSpacingDecorator,
  WhiteBgColorDecorator
} = decorators;

const showcaseConverter = showcaseToStoryBook(storiesOf, builtInKnobs, actions);

export * from "./styles";

export {
  BarSpacingDecorator,
  CenteredDecorator,
  LateralSpacingDecorator,
  sections,
  showcaseConverter,
  WhiteBgColorDecorator
};
