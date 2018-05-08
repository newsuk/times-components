import "react-native";
import React from "react";
import Topic from "./src/topic";

export default {
  name: "Pages/Topic",
  children: [
    {
      type: "story",
      name: "Topic",
      component: () => {
        const props = {
          name: "Animals",
          description:
            "Animals are multicellular eukaryotic organisms that form the biological kingdom Animalia. With few  exceptions, animals consume organic materials."
        };
        return <Topic {...props} />;
      }
    }
  ]
};
