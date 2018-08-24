import React from "react";
import Interactive from "./src/interactives";
import fixtures from "./fixtures";

export default {
  name: "Interactives",
  children: [
    {
      type: "story",
      name: "Interactives",
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
