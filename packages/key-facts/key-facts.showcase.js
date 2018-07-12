import React from "react";
import { LateralSpacingDecorator } from "@times-components/storybook";
import KeyFacts from "./src/key-facts";
import data from "./fixtures/key-facts.json";

export default {
  name: "KeyFacts",
  children: [
    {
      type: "decorator",
      decorator: LateralSpacingDecorator
    },
    {
      type: "story",
      name: "KeyFacts",
      component: () => <KeyFacts data={data} />
    }
  ]
};
