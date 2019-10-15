import React from "react";
import HomePage from "./src/home-page";

export default {
  children: [
    {
      component: () => <HomePage />,
      name: "HomePage",
      type: "story"
    }
  ],
  name: "HomePage"
};
