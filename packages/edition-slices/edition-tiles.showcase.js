import React from "react";
import { PrimaryTile } from "./src/tiles";
import leadOneAndOneDataGenerator from "./fixtures/leadoneandone";

const leadOneAndOneData = leadOneAndOneDataGenerator();

export default {
  children: [
    {
      component: () => <PrimaryTile tile={leadOneAndOneData.lead} withImage />,
      name: "Primary (with image)",
      type: "story"
    },
    {
      component: () => <PrimaryTile tile={leadOneAndOneData.lead} />,
      name: "Primary (without image)",
      type: "story"
    }
  ],
  name: "Composed/Edition/Tiles"
};
