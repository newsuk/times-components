import { storiesOf } from "@storybook/react-native";
import * as knobs from "@storybook/addon-knobs/react";
import * as actions from "@storybook/addon-actions";
import showcaseToStoryBook from "../showcase-to-storybook";

jest.mock("../showcase-to-storybook");

test("The storybook should create the expected converter", () => {
  require("../storybook"); // eslint-disable-line global-require

  expect(showcaseToStoryBook).toHaveBeenCalledWith(storiesOf, knobs, actions);
});
