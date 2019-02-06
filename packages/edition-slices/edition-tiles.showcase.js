import React from "react";
import {
  mockLeadOneAndFourSlice,
  mockLeadOneFullWidthSlice,
  mockSecondaryFourSlice
} from "@times-components/fixture-generator";

import {
  TileA,
  TileB,
  TileC,
  TileD,
  TileE,
  TileG,
  TileI,
  TileJ
} from "./src/tiles";

export default {
  children: [
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <TileA onPress={() => {}} tile={slice.lead} />;
      },
      name: "Tile A - Bottom image, 35pt headline, no teaser",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <TileB onPress={() => {}} tile={slice.lead} />;
      },
      name: "Tile B - No image, 22pt headline, with teaser",
      type: "story"
    },
    {
      component: () => {
        const slice = mockSecondaryFourSlice();
        return <TileC onPress={() => {}} tile={slice.secondary1} />;
      },
      name: "Tile C - Top image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <TileD onPress={() => {}} tile={slice.lead} />;
      },
      name: "Tile D - Side 3/2 image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <TileE onPress={() => {}} tile={slice.lead} />;
      },
      name: "Tile E - Side 4/5 image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <TileG tile={slice.lead} />;
      },
      name: "Tile G - Roundel image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneAndFourSlice();
        return <TileI tile={slice.lead} />;
      },
      name: "Tile I - Vertical, top image, centered aligned summary",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneAndFourSlice();
        return <TileJ tile={slice.support1} />;
      },
      name: "Tile J - Horizontal, image left of article summary with 1:3 ratio",
      type: "story"
    }
  ],
  name: "Composed/Edition/Tiles"
};
