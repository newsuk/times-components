import React from "react";
import { mockStandardSection } from "@times-components/fixture-generator";
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
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          section={mockStandardSection("News")}
        />
      ),
      name: "News section",
      type: "story"
    }
  ],
  name: "Pages/Section"
};
