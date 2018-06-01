import React from "react";
import { View } from "react-native";
import { withTrackingContext } from "@times-components/tracking";
import storybookReporter from "@times-components/tealium-utils";
import ArticleTopic from "./src/article-topic";
import ArticleTopics from "./src/article-topics";
import topicsData from "./fixtures/topics";

const TrackingProvider = withTrackingContext(View, {
  trackingObjectName: "TopicsRenderStory"
});

export default {
  name: "Primitives/Article Topics",
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
        <ArticleTopics
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
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <ArticleTopic
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
