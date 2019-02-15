import React from "react";
import { ScrollView } from "react-native";
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
  TileM,
  TileN,
  TileO,
  TileR
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
  <ScrollView>
    <Tile
      onPress={preventDefaultedAction(decorateAction)("onPress")}
      tile={tile}
    />
  </ScrollView>
);

const tileStories = [
  {
    name: "Tile A - Bottom image, 35pt headline, no teaser",
    Tile: TileA
  },
  {
    name: "Tile B - No image, 22pt headline, with teaser",
    Tile: TileB
  },
  {
    name: "Tile C - Top image, 22pt headline, no teaser",
    Tile: TileC
  },
  {
    name: "Tile D - Side 3/2 image, 22pt headline, no teaser",
    Tile: TileD
  },
  {
    name: "Tile E - Side 4/5 image, 22pt headline, no teaser",
    Tile: TileE
  },
  {
    name: "Tile F - 35pt Headline, no image, strapline and teaser",
    Tile: TileF
  },
  {
    name: "Tile G - Roundel image, 22pt headline, no teaser",
    Tile: TileG
  },
  {
    name: "Tile I - Vertical, top image, centered aligned summary",
    Tile: TileI
  },
  {
    name: "Tile J - Horizontal, image left of article summary with 1:3 ratio",
    Tile: TileJ
  },
  {
    name: "Tile L - No image, 22pt headline, no teaser",
    Tile: TileL
  },
  {
    name:
      "Tile M - No image, 22pt headline, no teaser, comment article, center align",
    Tile: TileM
  },
  {
    name: "Tile N - Square image, 22pt headline, white color, black background",
    Tile: TileN
  },
  {
    name:
      "Tile O - No image, 20pt headline, no teaser, white color, black background",
    Tile: TileO
  },
  {
    name: "Tile R - Bottom image, 45pt headline, no teaser",
    Tile: TileR
  }
];

export default {
  children: tileStories.map(({ name, Tile }) => ({
    component: renderTile(Tile),
    name,
    type: "story"
  })),
  name: "Composed/Edition/Tiles"
};
