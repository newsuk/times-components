import React from "react";
import { View } from "react-native";
import { withTrackingContext } from "@times-components/tracking";
import storybookReporter from "@times-components/tealium-utils";
import Topic from "./src/topic";
import Topics from "./src/topics";
import topicsData from "./fixtures/topics";

const TrackingProvider = withTrackingContext(View, {
  trackingObjectName: "TopicsRenderStory"
});

export default {
  name: "Primitives/Topics",
  children: [
    {
      type: "decorator",
      decorator: c => (
        <TrackingProvider analyticsStream={storybookReporter}>
          {c()}
        </TrackingProvider>
      )
    },
    {
      type: "story",
      name: "Group of Topics",
      component: () => (
        <Topics
          topics={topicsData}
          onPress={e => {
            e.preventDefault();
          }}
        />
      )
    },
    {
      type: "story",
      name: "Single Topic",
      component: () => (
        <View style={{ flexDirection: "row" }}>
          <Topic
            id={topicsData[0].id}
            name={topicsData[0].name}
            onPress={e => {
              e.preventDefault();
            }}
          />
        </View>
      )
    }
  ]
};
