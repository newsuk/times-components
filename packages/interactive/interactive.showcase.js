/* eslint-disable react/prop-types */
import React from "react";
import { ScrollView, View } from "react-native";
import Interactive from "./src/interactive";
import fixtures from "./fixtures";

export default {
  name: "Primitives/Interactive",
  children: [
    {
      type: "story",
      name: "Interactive",
      component: ({ select }) => {
        const value = select(
          "Interactive",
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
                <Interactive {...fixtures[key]} />
              </View>
            ))}
          </ScrollView>
        );
      }
    }
  ]
};
