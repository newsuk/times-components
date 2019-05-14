import React from "react";
import { scales } from "@times-components/styleguide";
import MessageBar from "./src/message-bar";

export default {
  children: [
    {
      component: () => (
        <MessageBar
          animate
          delay={3000}
          message="Test message"
          scale={scales.medium}
        />
      ),
      name: "MessageBar",
      type: "story"
    }
  ],
  name: "Primitives/MessageBar"
};
