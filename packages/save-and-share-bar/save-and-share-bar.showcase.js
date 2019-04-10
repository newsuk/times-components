import React from "react";
import SaveAndShareBar from "./src/save-and-share-bar.web";

export default {
  children: [
    {
      component: () => <SaveAndShareBar />,
      name: "SaveAndShareBar",
      type: "story"
    }
  ],
  name: "SaveAndShareBar"
};
