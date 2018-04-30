import "react-native";
import React from "react";
import Watermark from "./src/watermark";

export default {
  name: "Primitives/Watermark",
  children: [
    {
      type: "story",
      name: "MPU",
      component: () => <Watermark width={300} height={250} />
    },
    {
      type: "story",
      name: "Full",
      component: () => (
        <Watermark width={970} height={250} viewBox="0 0 1000 300" />
      )
    }
  ]
};
