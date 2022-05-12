import React, { Component } from "react";
import { View } from "react-native";
import { editionBreakpoints } from "@times-components/ts-styleguide";
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

    return (
      <View style={container}>
        {puzzles.map(({ id, title, url, image }) => (
          <View style={tileContainer} key={`puzzleItem-${id}`}>
            {breakpoint === editionBreakpoints.small ? (
              <TileAJ
                id={id}
                image={image}
                onPress={onPress}
                title={title}
                url={url}
              />
            ) : (
              <TileAK
                id={id}
                image={image}
                onPress={onPress}
                title={title}
                url={url}
                breakpoint={breakpoint}
              />
            )}
          </View>
        ))}
      </View>
    );
  }

  render() {
    return (
      <ResponsiveSlice
        renderSmall={this.renderPuzzles}
        renderMedium={this.renderPuzzles}
      />
    );
  }
}

Puzzle.propTypes = propTypes;

export default Puzzle;
