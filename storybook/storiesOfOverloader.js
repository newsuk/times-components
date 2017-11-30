// Redirecting to the global version of storiesOf when testing with dextrose - this enables
// us to load stories into the fructose app, this should be revisited.
import storybook, { storiesOf as _storiesOf } from "@storybook/react-native";

export const storiesOf = global.storiesOf ? global.storiesOf : _storiesOf;
