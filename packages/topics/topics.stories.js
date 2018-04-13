import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withTrackingContext } from "@times-components/tracking";
import storybookReporter from "@times-components/tealium-utils";
import Topic from "./src/topic";
import Topics from "./src/topics";
import topicsData from "./fixtures/topics";

const TrackingProvider = withTrackingContext(View, {
  trackingObjectName: "TopicsRenderStory"
});

storiesOf("Primitives/Topics", module)
  .addDecorator(c => (
    <TrackingProvider analyticsStream={storybookReporter}>
      {c()}
    </TrackingProvider>
  ))
  .add("Group of Topics", () => (
    <Topics
      topics={topicsData}
      onPress={e => {
        e.preventDefault();
      }}
    />
  ))
  .add("Single Topic", () => (
    <View style={{ flexDirection: "row" }}>
      <Topic
        id={topicsData[0].id}
        name={topicsData[0].name}
        onPress={e => {
          e.preventDefault();
        }}
      />
    </View>
  ));
