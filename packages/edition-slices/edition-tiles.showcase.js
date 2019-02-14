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

export default {
  children: [
    {
      component: (_, { decorateAction }) => (
        <TileA
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          tile={tile}
        />
      ),
      name: "Tile A - Bottom image, 35pt headline, no teaser",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <TileB
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          tile={tile}
        />
      ),
      name: "Tile B - No image, 22pt headline, with teaser",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <TileC
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          tile={tile}
        />
      ),
      name: "Tile C - Top image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <TileD
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          tile={tile}
        />
      ),
      name: "Tile D - Side 3/2 image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <TileE
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          tile={tile}
        />
      ),
      name: "Tile E - Side 4/5 image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <TileF
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          tile={tile}
        />
      ),
      name: "Tile F - 35pt Headline, no image, strapline and teaser",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <TileG
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          tile={tile}
        />
      ),
      name: "Tile G - Roundel image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <TileI
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          tile={tile}
        />
      ),
      name: "Tile I - Vertical, top image, centered aligned summary",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <TileJ
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          tile={tile}
        />
      ),
      name: "Tile J - Horizontal, image left of article summary with 1:3 ratio",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <TileL
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          tile={tile}
        />
      ),
      name: "Tile L - No image, 22pt headline, no teaser",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <TileM
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          tile={tile}
        />
      ),
      name:
        "Tile M - No image, 22pt headline, no teaser, comment article, center align",
      type: "story"
    }
  ],
  name: "Composed/Edition/Tiles"
};
