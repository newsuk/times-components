import React from "react";
import SaveAndShareBar from "./src/save-and-share-bar";

export default {
  children: [
    {
      component: () => <SaveAndShareBar articleUrl="" onPress={() => {}} />,
      name: "Save snd Share bar",
      type: "story"
    }
  ],
  name: "Save and Share bar"
};
