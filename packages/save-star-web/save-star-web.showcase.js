import React from "react";
import SaveStarWeb from "./src/save-star-web";

export default {
  children: [
    {
      component: () => <SaveStarWeb articleId="123" />,
      name: "SaveStarWeb",
      type: "story"
    }
  ],
  name: "Primitives/SaveStarWeb"
};
