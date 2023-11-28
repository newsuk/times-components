/* eslint-disable react/prop-types */
import React from "react";
import InteractiveWrapper from "./src/interactive-wrapper";
import fixtures from "./fixtures";

export default {
  children: [
    {
      component: ({ select }) => {
        const value = select(
          "Interactive Wrapper",
          {
            "Chapter Heading": "chapterHeading",
            Datawrapper: "dataWrapper",
            "In Article Puff": "inArticlePuff",
            "Times Headline": "timesHeadline",
            "Twitter Embed": "twitterEmbed",
            "Vertical Timeline": "verticalTimeline"
          },
          "chapterHeading"
        );

        return <InteractiveWrapper {...fixtures[value]} />;
      },
      name: "Interactive Wrapper",
      type: "story"
    }
  ],
  name: "Primitives/Interactive Wrapper"
};
