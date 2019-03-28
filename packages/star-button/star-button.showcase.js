import React from "react";
import StarButton from "./src/star-button";

export default {
  children: [
    {
      component: () => <StarButton onPress={() => {}} />,
      name: "Default",
      type: "story"
    },
    {
      component: () => <StarButton onPress={() => {}} starState="selected" />,
      name: "Selected",
      type: "story"
    },
    {
      component: () => <StarButton onPress={() => {}} starState="disabled" />,
      name: "Disabled",
      type: "story"
    }
  ],
  name: "Primitives/StarButton"
};
