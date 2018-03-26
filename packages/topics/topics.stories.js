import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import Topic from "./topic";
import Topics from "./topics";
import topicsData from "./fixtures/topics";

storiesOf("Primitives/Topics", module)
  .add("Group of Topics", () => <Topics topics={topicsData} />)

  .add("Single Topic", () => (
    <View style={{ flexDirection: "row" }}>
      <Topic id={topicsData[0].id} name={topicsData[0].name} />
    </View>
  ));
