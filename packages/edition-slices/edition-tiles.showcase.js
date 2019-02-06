import React from "react";
import {
  mockLeadOneFullWidthSlice,
  mockSecondaryFourSlice
} from "@times-components/fixture-generator";
import { TileA, TileB, TileC, TileD, TileE } from "./src/tiles";

export default {
  children: [
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <TileA onPress={() => {}} tile={slice.lead} />;
      },
      name: "TileA (Bottom image, 35pt headline, no teaser)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <TileB onPress={() => {}} tile={slice.lead} />;
      },
      name: "TileB (No image, 22pt headline, with teaser)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockSecondaryFourSlice();
        return <TileC onPress={() => {}} tile={slice.secondary1} />;
      },
      name: "TileC (Top image, 22pt headline, no teaser)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <TileD onPress={() => {}} tile={slice.lead} />;
      },
      name: "TileD (Side 3 / 2 image, 22pt headline, no teaser)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <TileE onPress={() => {}} tile={slice.lead} />;
      },
      name: "TileE (Side 4 / 5 image, 22pt headline, no teaser)",
      type: "story"
    }
  ],
  name: "Composed/Edition/Tiles"
};
