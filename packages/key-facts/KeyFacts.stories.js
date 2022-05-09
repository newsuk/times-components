import React from "react";
import { storiesOf } from "@storybook/react";
import { decorateAction } from "@storybook/addon-actions";
import storybookReporter from "@times-components/tealium-utils";
import KeyFacts from "./src/key-facts";
import data from "./fixtures/key-facts-showcase.json";
import dataNoTitle from "./fixtures/key-facts-no-title-showcase.json";
import { TrackingContextProvider } from "@times-components/ts-components/dist/helpers/tracking/TrackingContextProvider";

storiesOf("Composed/Key Facts", module)
  .addDecorator(storyFn => (
      <TrackingContextProvider
        analyticsStream={storybookReporter}
        context={{
          component: "KeyFacts",
          attrs: {
          }
        }}
      >
        {storyFn()}
      </TrackingContextProvider>
  ))

  .add("Key Facts", () => 
      <KeyFacts ast={data} section="section" headline="headline" isLiveOrBreaking="breaking"/>
    )
    .add("Key Facts no title", () => 
    <KeyFacts ast={dataNoTitle} section="section" headline="headline" isLiveOrBreaking="breaking"/>
    )