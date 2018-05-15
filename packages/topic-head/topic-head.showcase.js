import "react-native";
import React from "react";
import TopicHead from "./src/topic-head";

export default {
  name: "Composed/Topic Head",
  children: [
    {
      type: "story",
      name: "Name only",
      component: () => {
        const props = {
          name: "Animals"
        };
        return <TopicHead {...props} />;
      }
    },
    {
      type: "story",
      name: "Name and description",
      component: () => {
        const props = {
          name: "Animals",
          description:
            "Animals are multicellular eukaryotic organisms that form the biological kingdom Animalia. With few  exceptions, animals consume organic materials."
        };
        return <TopicHead {...props} />;
      }
    },
    {
      type: "story",
      name: "Loading",
      component: () => {
        const props = {
          name: "Animals",
          isLoading: true
        };
        return <TopicHead {...props} />;
      }
    }
  ]
};
