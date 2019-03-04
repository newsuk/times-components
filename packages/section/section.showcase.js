import React from "react";
import {
  mockPuzzleSection,
  mockStandardSection
} from "@times-components/fixture-generator";
import storybookReporter from "@times-components/tealium-utils";
import Section from "./src/section";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);
export default {
  children: [
    {
      component: (_, { decorateAction }) => (
        <Section
          analyticsStream={storybookReporter}
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          publicationName="TIMES"
          section={mockStandardSection("News")}
        />
      ),
      name: "News section",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <Section
          analyticsStream={storybookReporter}
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          publicationName="TIMES"
          section={mockPuzzleSection("Puzzles")}
        />
      ),
      name: "Puzzles section",
      type: "story"
    }
  ],
  name: "Pages/Section"
};
