import React from "react";
import { scales } from "@times-components/ts-styleguide";
import MessageBar from "./src/message-bar";

export default {
  children: [
    {
      component: () => (
        <MessageBar
          animate
          close={() => {}}
          delay={3000}
          message="Article link copied"
          scale={scales.medium}
        />
      ),
      name: "MessageBar",
      type: "story"
    }
  ],
  name: "Primitives/MessageBar"
};
