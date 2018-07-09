import "react-native";
import React from "react";
import Watermark from "./src/watermark";

export default {
  name: "Primitives/Watermark",
  children: [
    {
      type: "story",
      name: "MPU",
      component: () => <Watermark height={250} width={300} />
    },
    {
      type: "story",
      name: "Full",
      component: () => (
        <Watermark height={250} viewBox="0 0 1000 300" width={970} />
      )
    }
  ]
};
