import React from "react";
import {
  mockLeadOneAndFourSlice,
  mockLeadOneFullWidthSlice,
  mockLeadTwoNoPicAndTwoSlice,
  mockSecondaryFourSlice
} from "@times-components/fixture-generator";

import {
  TileA,
  TileB,
  TileC,
  TileD,
  TileE,
  TileF,
  TileG,
  TileI,
  TileJ,
  TileL
} from "./src/tiles";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

export default {
  children: [
    {
      component: (_, { decorateAction }) => {
        const slice = mockLeadOneFullWidthSlice();
        return (
          <TileA
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            tile={slice.lead}
          />
        );
      },
      name: "Tile A - Bottom image, 35pt headline, no teaser",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => {
        const slice = mockLeadOneFullWidthSlice();
        return (
          <TileB
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            tile={slice.lead}
          />
        );
      },
      name: "Tile B - No image, 22pt headline, with teaser",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => {
        const slice = mockSecondaryFourSlice();
        return (
          <TileC
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            tile={slice.secondary1}
          />
        );
      },
      name: "Tile C - Top image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => {
        const slice = mockLeadOneFullWidthSlice();
        return (
          <TileD
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            tile={slice.lead}
          />
        );
      },
      name: "Tile D - Side 3/2 image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => {
        const slice = mockLeadOneFullWidthSlice();
        return (
          <TileE
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            tile={slice.lead}
          />
        );
      },
      name: "Tile E - Side 4/5 image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => {
        const slice = mockLeadTwoNoPicAndTwoSlice();
        return (
          <TileF
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            tile={slice.lead1}
          />
        );
      },
      name: "TileF (35pt Headline, no image, strapline and teaser)",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => {
        const slice = mockLeadOneFullWidthSlice();
        return (
          <TileG
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            tile={slice.lead}
          />
        );
      },
      name: "Tile G - Roundel image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => {
        const slice = mockLeadOneAndFourSlice();
        return (
          <TileI
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            tile={slice.lead}
          />
        );
      },
      name: "Tile I - Vertical, top image, centered aligned summary",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => {
        const slice = mockLeadOneAndFourSlice();
        return (
          <TileJ
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            tile={slice.support1}
          />
        );
      },
      name: "Tile J - Horizontal, image left of article summary with 1:3 ratio",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => {
        const slice = mockLeadOneFullWidthSlice();
        return (
          <TileL
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            tile={slice.lead}
          />
        );
      },
      name: "TileL (No image, 22pt headline, no teaser)",
      type: "story"
    }
  ],
  name: "Composed/Edition/Tiles"
};
