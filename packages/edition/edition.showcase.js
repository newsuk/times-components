import React from "react";
import { PrimaryTile } from "./src/tiles";
import { LeadOneFullWidthSlice, LeadOneAndOneSlice } from "./src/slices";
import leadOneAndOneData from "./fixtures/leadoneandone";

export default {
  children: [
    // Tiles
    {
      component: () => <PrimaryTile tile={leadOneAndOneData.lead} withImage />,
      name: "Tile - Primary (with image)",
      type: "story"
    },
    {
      component: () => <PrimaryTile tile={leadOneAndOneData.lead} withImage={false} />,
      name: "Tile - Primary (without image)",
      type: "story"
    },
    // Slices
    {
      component: () => <LeadOneFullWidthSlice lead={leadOneAndOneData.lead} />,
      name: "Slice - Lead One Full Width",
      type: "story"
    },
    {
      component: () => <LeadOneAndOneSlice lead={leadOneAndOneData.lead} support={leadOneAndOneData.support} />,
      name: "Slice - Lead One And One",
      type: "story"
    }
  ],
  name: "Edition"
};
