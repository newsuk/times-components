import React from "react";
import { LateralSpacingDecorator } from "@times-components/storybook";
import KeyFacts from "./src/key-facts";
import data from "./fixtures/key-facts.json";

const { data: { children, attributes } } = data;

export default {
  name: "Composed/Key Facts",
  children: [
    {
      type: "decorator",
      decorator: LateralSpacingDecorator
    },
    {
      type: "story",
      name: "default",
      component: () => (
        <KeyFacts
          items={children[0].children}
          onLinkPress={() => {}}
          title={attributes.title}
        />
      )
    }
  ]
};
