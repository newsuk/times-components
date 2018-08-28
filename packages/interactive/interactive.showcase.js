import React from "react";
import Interactive from "./src/interactive";
import fixtures from "./fixtures";

export default {
  name: "Interactive",
  children: [
    {
      type: "story",
      name: "Interactive",
      component: ({ select }) => {

        const value = select("Interactive", {
          chapterHeading: 'Chapter Heading'
        }, 'chapterHeading')

        return (
          <Interactive
            {...fixtures[value]}
          />
        );
      }
    }
  ]
};
