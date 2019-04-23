import React from "react";
import MessageBar from "./src/message-bar";

export default {
  children: [
    {
      component: () => <MessageBar />,
      name: "MessageBar",
      type: "story"
    }
  ],
  name: "MessageBar"
};
