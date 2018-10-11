/* eslint-disable react/prop-types */
import React from "react";
import { ScrollView, View } from "react-native";
import InteractiveWrapper from "./src/interactive-wrapper";
import fixtures from "./fixtures";

export default {
  children: [
    {
      component: ({ select }) => {
        const value = select(
          "Interactive Wrapper",
          {
            chapterHeading: "Chapter Heading",
            dataWrapper: "Datawrapper",
            inArticlePuff: "In Article Puff",
            timesHeadline: "Times Headline",
            twitterEmbed: "Twitter Embed",
            verticalTimeline: "Vertical Timeline"
          },
          "chapterHeading"
        );

        return (
          <ScrollView>
            {Object.keys(fixtures).map(key => (
              <View
                key={key}
                style={
                  value === key ? { display: "flex" } : { display: "none" }
                }
              >
                <InteractiveWrapper {...fixtures[key]} />
              </View>
            ))}
          </ScrollView>
        );
      },
      name: "Interactive Wrapper",
      type: "story"
    }
  ],
  name: "Primitives/Interactive Wrapper"
};
