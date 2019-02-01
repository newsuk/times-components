import React from "react";
import {
  mockLeadOneFullWidthSlice,
  mockSecondaryFourSlice
} from "@times-components/fixture-generator";
import { TileA, TileB, TileC } from "./src/tiles";

export default {
  children: [
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <TileA tile={slice.lead} />;
      },
      name: "TileA (Bottom image, 35pt headline, no teaser)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <TileB tile={slice.lead} />;
      },
      name: "TileB (No image, 22pt headline, with teaser)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockSecondaryFourSlice();
        return <TileC tile={slice.secondary1} />;
      },
      name: "TileC (Top image, 22pt headline, no teaser",
      type: "story"
    }
  ],
  name: "Composed/Edition/Tiles"
};
