import React from "react";
import SaveStarWeb from "./src/save-star-web";

export default {
  children: [
    {
      component: () => <SaveStarWeb />,
      name: "SaveStarWeb",
      type: "story"
    }
  ],
  name: "SaveStarWeb"
};
