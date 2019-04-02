import React from "react";
import StarButton from "./src/star-button";

export default {
  children: [
    {
      component: () => <StarButton onPress={() => {}} />,
      name: "Initial",
      type: "story"
    },
    {
      component: () => <StarButton onPress={() => {}} selected />,
      name: "Selected",
      type: "story"
    },
    {
      component: () => <StarButton disabled onPress={() => {}} />,
      name: "Disabled",
      type: "story"
    }
  ],
  name: "Primitives/Star Button"
};
