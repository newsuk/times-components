import React from "react";
import StarButton from "./src/star-button";

export default {
  children: [
    {
      component: () => <StarButton onPress={() => { }} />,
      name: "StarButton",
      type: "story"
    }
  ],
  name: "Primitives/StarButton"
};
