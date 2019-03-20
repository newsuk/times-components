import React from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import propTypes from "./proptypes";
import stylesFactory from "./styles";
import { ResponsiveSlice } from "../shared";
import { TileAJ, TileAK } from "../../tiles";

const Puzzle = ({ onPress, slice: { puzzles } }) => {
  const renderPuzzles = (breakpoint = editionBreakpoints.small) => {
    const { container } = stylesFactory(breakpoint);
    const Tile = breakpoint === editionBreakpoints.small ? TileAJ : TileAK;

    return (
      <View style={container}>
        {puzzles.map(({ id, title, url, image }) => (
          <Tile
            id={id}
            image={image}
            onPress={onPress}
            title={title}
            url={url}
          />
        ))}
      </View>
    );
  };

  return (
    <ResponsiveSlice
      renderMedium={breakpoint => renderPuzzles(breakpoint)}
      renderSmall={breakpoint => renderPuzzles(breakpoint)}
    />
  );
};

Puzzle.propTypes = propTypes;

export default Puzzle;
