import { LateralSpacingDecorator } from "@times-components/storybook";
import data from "./fixtures/key-facts-showcase.json";
import dataNoTitle from "./fixtures/key-facts-no-title-showcase.json";
import renderKeyFacts from "./showcase-helper";

export default {
  children: [
    {
      decorator: LateralSpacingDecorator,
      type: "decorator"
    },
    {
      component: ({ select }) =>
        renderKeyFacts({ ast: data, hasScaling: false, select }),
      name: "with title",
      platform: "web",
      type: "story"
    },
    {
      component: ({ select }) =>
        renderKeyFacts({ ast: dataNoTitle, hasScaling: false, select }),
      name: "without title",
      platform: "web",
      type: "story"
    }
  ],
  name: "Composed/Key Facts"
};
