import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { boolean } from "@storybook/addon-knobs/react";
import LeadAndTwoSlice from "./";

storiesOf("Primitives/Slice", module).add("Lead and two", () => (
  <LeadAndTwoSlice
    lead={() => (
      <View
        id="lead"
        style={{
          minHeight: 320,
          backgroundColor: "red"
        }}
      />
    )}
    support1={() =>
      boolean("Show support 1?", true, "") ? (
        <View
          id="support-1"
          style={{
            minHeight: 150,
            backgroundColor: "yellow"
          }}
        />
      ) : null
    }
    support2={() =>
      boolean("Show support 2?", true, "") ? (
        <View
          id="support-2"
          style={{
            minHeight: 150,
            backgroundColor: "green"
          }}
        />
      ) : null
    }
  />
));
