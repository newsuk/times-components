import React from "react";
import StarButton from "./src/star-button";

const getProps = ({ boolean }) => ({
  isDark: boolean("Enable Dark theme", false),
  onPress: () => {}
});

export default {
  children: [
    {
      component: knobs => <StarButton {...getProps(knobs)} />,
      name: "Initial",
      type: "story"
    },
    {
      component: knobs => <StarButton {...getProps(knobs)} selected />,
      name: "Selected",
      type: "story"
    },
    {
      component: knobs => <StarButton {...getProps(knobs)} disabled />,
      name: "Disabled",
      type: "story"
    }
  ],
  name: "Primitives/Star Button"
};
