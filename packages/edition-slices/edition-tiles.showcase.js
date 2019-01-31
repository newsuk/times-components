import React from "react";
import {
  mockLeadOneFullWidthSlice,
  mockSecondaryOneSlice,
  mockSecondaryFourSlice
} from "@times-components/fixture-generator";
import {
  TileA,
  TileB,
  SecondaryTile,
  SecondaryTileImageReversed
} from "./src/tiles";

export default {
  children: [
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <TileA tile={slice.lead} />;
      },
      name: "TileA (Bottom image, 35 headline, no teaser)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <TileB tile={slice.lead} />;
      },
      name: "TileB (No image, 35 headline, no teaser)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockSecondaryOneSlice();
        return <SecondaryTile tile={slice.secondary} />;
      },
      name: "Secondary",
      type: "story"
    },
    {
      component: () => {
        const slice = mockSecondaryFourSlice();
        return <SecondaryTileImageReversed tile={slice.secondary1} withImage />;
      },
      name: "SecondaryTileImageReversed",
      type: "story"
    }
  ],
  name: "Composed/Edition/Tiles"
};
