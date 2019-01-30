import React from "react";
import {
  mockLeadOneFullWidthSlice,
  mockSecondaryOneSlice,
  mockSecondaryFourSlice
} from "@times-components/fixture-generator";
import {
  PrimaryTile,
  SecondaryTile,
  SecondaryTileImageReversed
} from "./src/tiles";

export default {
  children: [
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <PrimaryTile tile={slice.lead} withImage withSummaryMargins />;
      },
      name: "Primary (with image, with summary margins)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <PrimaryTile tile={slice.lead} withSummaryMargins />;
      },
      name: "Primary (without image, with summary margins)",
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
