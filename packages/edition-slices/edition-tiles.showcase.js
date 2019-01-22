import React from "react";
import { PrimaryTile } from "./src/tiles";
import leadOneAndOneData from "./fixtures/leadoneandone";

export default {
  children: [
    {
      component: () => <PrimaryTile tile={leadOneAndOneData.lead} withImage />,
      name: "Tile - Primary (with image)",
      type: "story"
    },
    {
      component: () => (
        <PrimaryTile tile={leadOneAndOneData.lead} withImage={false} />
      ),
      name: "Tile - Primary (without image)",
      type: "story"
    }
  ],
  name: "Composed/Edition/Tiles"
};
