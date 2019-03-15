import React from "react";
import { ScrollView } from "react-native";
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
  <ScrollView>
    <Tile
      id={id}
      image={image}
      onPress={preventDefaultedAction(decorateAction)("onPress")}
      title={title}
      url={url}
    />
  </ScrollView>
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
    type: "story"
  })),
  name: "Composed/Edition/Puzzles/Tiles"
};
