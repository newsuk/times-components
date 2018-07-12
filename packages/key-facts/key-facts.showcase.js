import React from "react";
import KeyFacts from "./src/key-facts";

export default {
  name: "KeyFacts",
  children: [
    {
      type: "story",
      name: "KeyFacts",
      component: () => <KeyFacts />
    }
  ]
};
