import React from "react";
import MessageBar from "./src/message-bar";
import { scales } from "@times-components/styleguide";

export default {
  children: [
    {
      component: () => <MessageBar scale={scales.medium} message="Test message" />,
      name: "MessageBar",
      type: "story"
    }
  ],
  name: "Primitives/MessageBar"
};
