import React from "react";
import StarButton, { starStates } from "./src/star-button";

export default {
  children: [
    {
      component: () => <StarButton onPress={() => {}} />,
      name: "Initial",
      type: "story"
    },
    {
      component: () => (
        <StarButton onPress={() => {}} starState={starStates.selected} />
      ),
      name: "Selected",
      type: "story"
    },
    {
      component: () => (
        <StarButton onPress={() => {}} starState={starStates.disabled} />
      ),
      name: "Disabled",
      type: "story"
    }
  ],
  name: "Primitives/StarButton"
};
