import React from "react";
import { mockEditionSlice } from "@times-components/fixture-generator";

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
  TileL,
  TileM
} from "./src/tiles";

const tile = mockEditionSlice(1).items[0];
const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const renderTile = Tile => (_, { decorateAction }) => (
  <Tile
    onPress={preventDefaultedAction(decorateAction)("onPress")}
    tile={tile}
  />
);

export default {
  children: [
    {
      component: renderTile(TileA),
      name: "Tile A - Bottom image, 35pt headline, no teaser",
      type: "story"
    },
    {
      component: renderTile(TileB),
      name: "Tile B - No image, 22pt headline, with teaser",
      type: "story"
    },
    {
      component: renderTile(TileC),
      name: "Tile C - Top image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: renderTile(TileD),
      name: "Tile D - Side 3/2 image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: renderTile(TileE),
      name: "Tile E - Side 4/5 image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: renderTile(TileF),
      name: "Tile F - 35pt Headline, no image, strapline and teaser",
      type: "story"
    },
    {
      component: renderTile(TileG),
      name: "Tile G - Roundel image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: renderTile(TileI),
      name: "Tile I - Vertical, top image, centered aligned summary",
      type: "story"
    },
    {
      component: renderTile(TileJ),
      name: "Tile J - Horizontal, image left of article summary with 1:3 ratio",
      type: "story"
    },
    {
      component: renderTile(TileL),
      name: "Tile L - No image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: renderTile(TileM),
      name:
        "Tile M - No image, 22pt headline, no teaser, comment article, center align",
      type: "story"
    }
  ],
  name: "Composed/Edition/Tiles"
};
