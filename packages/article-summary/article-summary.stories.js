import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import ArticleSummary from "./article-summary";

const props = {
  label: "Lorem ipsum",
  headline: "Lorem ipsum dolor sit amet",
  date: "Sunday June 11 2017",
  publication: "Consectetur adipiscing elit",
  text:
    "Donec placerat sodales magna, eget tempus sem iaculis sit amet. In hac habitasse platea dictumst. In pellentesque urna magna, quis condimentum ante ornare at. Etiam sem enim, accumsan ut magna non, efficitur tempus arcu. Sed elementum pretium ante non porttitor. Curabitur vestibulum, orci at pharetra dictum, magna nisi tincidunt neque, hendrerit pellentesque augue metus eget dolor. Nulla laoreet elementum urna, ac condimentum diam vehicula et. Pellentesque lacinia ornare arcu, eget scelerisque lorem auctor non. Ut eu pulvinar risus."
};

storiesOf("ArticleSummary", module).add("ArticleSummary", () =>
  <View style={{ width: "100%", padding: 30 }}>
    <ArticleSummary {...props} />
  </View>
);
