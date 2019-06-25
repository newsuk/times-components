import React from "react";
import TextFlow from "./src/text-flow";

export default {
  children: [
    {
      component: () => <TextFlow />,
      name: "TextFlow",
      platform: "native",
      type: "story"
    }
  ],
  name: "TextFlow"
};
