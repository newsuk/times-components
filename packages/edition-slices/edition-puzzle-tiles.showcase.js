import React from "react";
import { TcView } from "@times-components/utils";
import { mockPuzzleSlice } from "@times-components/fixture-generator";

import { TileAJ, TileAK } from "./src/tiles";

const puzzle = mockPuzzleSlice();

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const renderTile = (Tile, { id, image, title, url }) => (
  _,
  { decorateAction }
) => (
  <TcView>
    <Tile
      id={id}
      image={image}
      onPress={preventDefaultedAction(decorateAction)("onPress")}
      title={title}
      url={url}
    />
  </TcView>
);

const tileStories = [
  {
    name: "Tile AJ -  Puzzle tile 22pt headline",
    Tile: TileAJ
  },
  {
    name: "Tile AK -  Puzzle tile 25pt headline",
    Tile: TileAK
  }
];

export default {
  children: tileStories.map(({ name, Tile, mockTile = puzzle }) => ({
    component: renderTile(Tile, mockTile),
    name,
    type: "story",
    platform: "native"
  })),
  name: "Composed/Edition/Puzzles/Tiles"
};
