import { storiesOf } from "@storybook/react-native";
import * as actions from "@storybook/addon-actions";
import showcaseToStoryBook from "../src/showcase-to-storybook";
import knobs from "../src/knobs";

jest.mock("../src/showcase-to-storybook");

test("The storybook should create the expected converter", () => {
  require("../src/storybook"); // eslint-disable-line global-require

  expect(showcaseToStoryBook).toHaveBeenCalledWith(storiesOf, knobs, actions);
});
