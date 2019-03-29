import React, { Component } from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";
import propTypes from "./proptypes";
import stylesFactory from "./styles";
import { ResponsiveSlice } from "../shared";
import { TileAJ, TileAK } from "../../tiles";

class Puzzle extends Component {
  constructor(props) {
    super(props);
    this.renderPuzzles = this.renderPuzzles.bind(this);
  }

  renderPuzzles(breakpoint) {
    const {
      onPress,
      slice: { puzzles }
    } = this.props;
    const { container, tileContainer } = stylesFactory(breakpoint);
    const Tile = breakpoint === editionBreakpoints.small ? TileAJ : TileAK;

    return (
      <View style={container}>
        {puzzles.map(({ id, title, url, image }) => (
          <View style={tileContainer}>
            <Tile
              id={id}
              image={image}
              onPress={onPress}
              title={title}
              url={url}
            />
          </View>
        ))}
      </View>
    );
  }

  render() {
    return (
      <ResponsiveSlice
        renderMedium={this.renderPuzzles}
        renderSmall={this.renderPuzzles}
      />
    );
  }
}

Puzzle.propTypes = propTypes;

export default Puzzle;
