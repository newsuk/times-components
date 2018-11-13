import React from "react";
import FixtureGenerator from "./src/fixture-generator";

export default {
  children: [
    {
      component: () => <FixtureGenerator />,
      name: "FixtureGenerator",
      type: "story"
    }
  ],
  name: "FixtureGenerator"
};
